import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController";

const taskRouter = Router();

taskRouter.route("/getAllTasks").get(verifyToken, getAllTasks);
taskRouter.route("/createTask").post(verifyToken, createTask);
taskRouter.route("/updateTask/:id").put(verifyToken, updateTask);
taskRouter.route("/deleteTask/:id").delete(verifyToken, deleteTask);

export default taskRouter;
