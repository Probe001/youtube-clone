import User from "../models/User";
import bcypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
	const { name, username, email, password, password2, location } = req.body;
	const pageTitle = "Join";
	if (password !== password2) {
		return res.status(400).render("join", {
			pageTitle,
			errorMessage: "Password confirmation does not match.",
		});
	}
	const exists = await User.exists({ $or: [{ username }, { email }] });
	if (exists) {
		return res.status(400).render("join", {
			pageTitle,
			errorMessage: `This email/username is already taken.`,
		});
	}
	try {
		await User.create({
			name,
			username,
			email,
			password,
			location,
		});
		return res.redirect("/login");
	} catch (error) {
		return res.status(400).render("join", {
			pageTitle,
			errorMessage: error._message,
		});
	}
};
export const getLogin = (req, res) =>
	res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
	const pageTitle = "Login";
	const { username, password } = req.body;
	const user = await User.findOne({ username, socialOnly: false });
	if (!user) {
		return res.status(400).render("login", {
			pageTitle,
			errorMessage: "An account with this username does not exists",
		});
	}
	// check if password correct
	const ok = await bcypt.compare(password, user.password);
	console.log(ok);
	if (!ok) {
		return res.status(400).render("login", {
			pageTitle,
			errorMessage: "Wrong password",
		});
	}
	req.session.loggedIn = true;
	req.session.user = user;
	console.log("LOG USER IN! COMMING SOON!");
	return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
	const baseUrl = "https://github.com/login/oauth/authorize";
	const config = {
		client_id: process.env.GH_CLIENT,
		allow_signup: false,
		scope: "read:user user:email",
	};
	const params = new URLSearchParams(config).toString();
	const finalUrl = `${baseUrl}?${params}`;
	return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
	console.log("code", req.query.code);
	const baseUrl = "https://github.com/login/oauth/access_token";
	const config = {
		client_id: process.env.GH_CLIENT,
		client_secret: process.env.GH_SECRET,
		code: req.query.code,
	};
	const params = new URLSearchParams(config).toString();
	const finalUrl = `${baseUrl}?${params}`;
	const tokenRequest = await (
		await fetch(finalUrl, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
		})
	).json();
	// res.send(JSON.stringify(json));
	if ("access_token" in tokenRequest) {
		const { access_token } = tokenRequest;
		const apiUrl = "https://api.github.com";
		const userData = await (
			await fetch(`${apiUrl}/user`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
		).json();
		const emailData = await (
			await fetch(`${apiUrl}/user/emails`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
		).json();
		console.log("user:", userData);
		console.log("Email:", emailData);
		const emailObj = emailData.find((email) => {
			return email.primary === true && email.verified === true;
		});
		if (!emailObj) {
			return res.redirect("/login");
		}
		const user = await User.findOne({ email: emailObj.email });
		if (!user) {
			const user = await User.create({
				name: userData.name ? userData.name : userData.login,
				username: userData.login,
				avatarUrl: userData.avatar_url,
				email: emailObj.email,
				password: "",
				location: userData.location,
				socialOnly: true,
			});
		}
		req.session.loggedIn = true;
		req.session.user = user;
		return res.redirect("/");
	} else {
		return res.redirect("/login");
	}
};

export const logout = (req, res) => {
	req.session.destroy();
	return res.redirect("/");
};
export const edit = (req, res) => res.send("User Edit");
export const see = (req, res) => res.send("see user");
