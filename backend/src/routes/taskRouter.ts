import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { createTask, getAllTasks } from "../controllers/taskController";

const taskRouter = Router();

taskRouter.route("/getAllTasks").get(verifyToken, getAllTasks);
taskRouter.route("/createTask").post(verifyToken, createTask);

export default taskRouter;
