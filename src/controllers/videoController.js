import Video from "../models/Video";

export const home = async (req, res) => {
	try {
		const videos = await Video.find({});
		return res.render("home", { pageTitle: "Home", videos });
		// res.render("home", { pageTitle: "Home", videos });
		// res.sendStatus(200);
	} catch (error) {
		console.log("error 발생");
		return res.send("server-error");
	}
};

export const watch = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404", { pageTitle: "Page Not Found" });
	}
	return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.render("404", { pageTitle: "Page Not Found" });
	}

	console.log(video);
	return res.render("edit", { pageTitle: `Editing`, video });
};
export const postEdit = async (req, res) => {
	const { id } = req.params;
	const { title, description, hashtags } = req.body;

	const video = await Video.exists({ _id: id });
	if (!video) {
		return res.render("404", { pageTitle: "Page Not Found" });
	}

	await Video.findByIdAndUpdate(id, {
		title,
		description,
		hashtags: Video.formatHashtags(hashtags),
	});
	return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
	return res.render("upload", { pageTitle: "Video Uploading" });
};
export const postUpload = async (req, res) => {
	const { title, description, hashtags } = req.body;
	// console.log(title, description, hashtags);
	// const video = new Video({
	// 	title,
	// 	description,
	// 	hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
	// });
	// const dbVideo = await video.save();
	// console.log(dbVideo);
	// return res.redirect("/");
	try {
		await Video.create({
			title,
			description,
			// createdAt: Date.now(),
			// meta: {
			// 	views: 0,
			// 	rating: 0,
			// },
			hashtags: Video.formatHashtags(hashtags),
		});
		return res.redirect("/");
	} catch (error) {
		console.log(error);
		return res.render("upload", {
			pageTitle: "Video Uploading",
			errorMessage: error._message,
		});
	}
};
