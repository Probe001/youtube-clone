import User from "../models/User";
import bcypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
	console.log(req.body);
	const { name, username, email, password, password2, location } = req.body;
	const pageTitle = "Join";
	// const usernameExists = await User.exists({ username });
	// if (usernameExists) {
	// 	return res.render("join", {
	// 		pageTitle: "Join",
	// 		errorMessage: "This username is already taken",
	// 	});
	// }
	// const eamilExists = await User.exists({ email });
	// if (eamilExists) {
	// 	return res.render("join", {
	// 		pageTitle: "Join",
	// 		errorMessage: "This email is already taken",
	// 	});
	// }
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
			errorMessage: `This email is already taken.`,
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
	const user = await User.findOne({ username });
	console.log(user);
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
	console.log("LOG USER IN! COMMING SOON!");
	return res.redirect("/");
};
export const edit = (req, res) => res.send("User Edit");
export const remove = (req, res) => res.send("User Delete");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see user");
