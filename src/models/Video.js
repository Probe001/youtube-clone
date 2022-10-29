import mongoose from "mongoose";

// export const foramtHashtags = (hashtags) => {
// 	return hashtags
// 		.split(",")
// 		.map((word) => (word.trim().startsWith("#") ? word : `#${word.trim()}`));
// };

const videoSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true, maxLength: 80 },
	description: { type: String, required: true, trim: true, minLength: 20 }, // {type: String} 과 같은 표현방식.
	createdAt: { type: Date, required: true, default: Date.now },
	hashtags: [{ type: String, trim: true }],
	meta: {
		views: { type: Number, default: 0 },
		rating: { type: Number, default: 0 },
	},
});

videoSchema.static("formatHashtags", function (hashtags) {
	return hashtags
		.split(",")
		.map((word) => (word.trim().startsWith("#") ? word : `#${word.trim()}`));
});

// videoSchema.pre("save", async function () {
// 	console.log("we are about to save:", this);
// 	this.hashtags = this.hashtags[0]
// 		.split(",")
// 		.map((word) => (word.trim().startsWith("#") ? word : `#${word.trim()}`));
// });

const video = mongoose.model("Video", videoSchema);
export default video;
