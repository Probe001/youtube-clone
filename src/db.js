import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
// 이름 명시 필요

const db = mongoose.connection;

const handleError = (error) => console.log("DB Error", error);
const handleOpen = () => console.log("DB Connected");

db.on("error", handleError);
db.once("open", handleOpen);
// on: 여러번 일어날 수 있음, once: 한번만 일어남
