let videos = [
	{
		title: "video #1",
		rating: 5,
		comments: 2,
		createdAt: "2 minutes ago",
		views: 1,
		id: 0,
	},
	{
		title: "video #2",
		rating: 4,
		comments: 5,
		createdAt: "5 minutes ago",
		views: 489,
		id: 1,
	},
	{
		title: "video #3",
		rating: 4.5,
		comments: 23,
		createdAt: "10 minutes ago",
		views: 1502,
		id: 2,
	},
];
let id = 3;

export const trending = (req, res) => {
	return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
	console.log(req.params);
	const { id } = req.params;
	const video = videos[id];
	console.log(`show video ${id}`);
	return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const getEdit = (req, res) => {
	const { id } = req.params;
	const video = videos[id];
	return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
	const { id } = req.params;
	console.log(req.body);
	const { title } = req.body;
	const video = videos[id];
	video.title = title;
	return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
	return res.render("videoUpload", { pageTitle: "Video Uploading" });
};
export const postUpload = (req, res) => {
	const { title } = req.body;
	const newVideo = {
		title,
		rating: 5.0,
		comments: 0,
		createdAt: "0 minute ago",
		views: 0,
		id: id++,
	};
	videos.push(newVideo);
	return res.redirect("/");
};
