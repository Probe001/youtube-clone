import express from "express";
import {
	logout,
	see,
	startGithubLogin,
	finishGithubLogin,
	getEdit,
	postEdit,
} from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectMiddleware, logout);
userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;
