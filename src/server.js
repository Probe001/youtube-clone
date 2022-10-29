import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // req.body를 생성한다.
app.use(express.static(__dirname + "/public"));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

// const handleListening = () => {
// 	console.log(`Server listening on port http://localhost:${PORT}`);
// };
// app.listen(PORT, handleListening);
