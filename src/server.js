import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
// const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // req.body를 생성한다.
app.use(express.static(__dirname + "/public"));
app.use(
	session({
		secret: "Hello!",
		resave: true,
		saveUninitialized: true,
	})
);

app.use((req, res, next) => {
	console.log(req.headers.cookie);
	req.sessionStore.all((error, sessions) => {
		console.log(sessions);
	});
	next();
});

app.get("/add-one", (req, res, next) => {
	req.session.potato += 1;
	return res.send(`${req.session.id}, ${req.session.potato}`);
});

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

// const handleListening = () => {
// 	console.log(`Server listening on port http://localhost:${PORT}`);
// };
// app.listen(PORT, handleListening);
