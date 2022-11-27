import express from "express";
import {
	logout,
	see,
	startGithubLogin,
	finishGithubLogin,
	getEdit,
	postEdit,
	getChangePassword,
	postChangePassword,
} from "../controllers/userController";
import {
	protectMiddleware,
	publicOnlyMiddleware,
	avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectMiddleware, logout);
userRouter
	.route("/edit")
	.all(protectMiddleware)
	.get(getEdit)
	.post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter
	.route("/change-password")
	.all(protectMiddleware)
	.get(getChangePassword)
	.post(postChangePassword);

userRouter.get("/:id", see);

export default userRouter;
