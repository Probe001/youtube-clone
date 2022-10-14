import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
	title: String,
	description: String, // {type: String} 과 같은 표현방식.
	createdAt: Date,
	hashtags: [{ type: String }],
	meta: {
		views: Number,
		rating: Number,
	},
});

const video = mongoose.model("Video", videoSchema);
export default video;
