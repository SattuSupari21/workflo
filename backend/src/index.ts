import { Express } from "express";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

// Routes
import authRouter from "./routes/authRouter";
import taskRouter from "./routes/taskRouter";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
