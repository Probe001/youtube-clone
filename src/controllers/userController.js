import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
	console.log(req.body);
	const { name, username, email, password, location } = req.body;
	await User.create({
		name,
		username,
		email,
		password,
		location,
	});
	return res.redirect("/login");
};
export const edit = (req, res) => res.send("User Edit");
export const remove = (req, res) => res.send("User Delete");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see user");
