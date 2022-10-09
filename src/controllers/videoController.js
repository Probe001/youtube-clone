export const trending = (req, res) => {
	const videos = [
		{
			title: "video #1",
			rating: 5,
			comments: 2,
			createdAt: "2 miinutes ago",
			views: 59,
			id: 1,
		},
		{
			title: "video #2",
			rating: 4,
			comments: 5,
			createdAt: "5 miinutes ago",
			views: 489,
			id: 2,
		},
		{
			title: "video #3",
			rating: 4.5,
			comments: 23,
			createdAt: "10 miinutes ago",
			views: 1502,
			id: 3,
		},
	];
	return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("upload");
export const deleteVideo = (req, res) => {
	console.log(req.params);
	return res.send("delete video");
};
