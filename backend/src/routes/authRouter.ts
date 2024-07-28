import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";

const authRouter = Router();

authRouter.route("/registerUser").post(registerUser);
authRouter.route("/loginUser").post(loginUser);

export default authRouter;
