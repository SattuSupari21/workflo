import { Router } from "express";
import {
  loginUser,
  registerUser,
  middlewareTest,
} from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";

const authRouter = Router();

authRouter.route("/registerUser").post(registerUser);
authRouter.route("/loginUser").post(loginUser);
authRouter.route("/middlewareTest").get(verifyToken, middlewareTest);

export default authRouter;
