import video from "../models/Video";

export const home = (req, res) => {
	video.find({}, (error, videos) => {
		console.log("errors", error);
		console.log("videos", videos);
		return res.render("home", { pageTitle: "Home", videos });
	});
};

export const watch = (req, res) => {
	console.log(req.params);
	const { id } = req.params;
	return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
	const { id } = req.params;
	return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
	return res.render("videoUpload", { pageTitle: "Video Uploading" });
};
export const postUpload = (req, res) => {
	const { title } = req.body;
	return res.redirect("/");
};
