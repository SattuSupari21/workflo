import { Request, Response } from "express";
import { prisma } from "../../lib";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    return res.status(200).json({ tasks });
  } catch (e) {
    const error = (e as Error).message;
    return res.status(500).json({ error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, deadline } = req.body;
    const userId = req.userId;
    const newEntry = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        deadline,
        userId,
      },
    });
    return res.status(201).json({ newEntry });
  } catch (e) {
    const error = (e as Error).message;
    return res.status(500).json({ error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    // check if the task exists or not
    const { taskId } = req.params;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Invalid Task!" });
    }

    const { title, description, status, priority, deadline } = req.body;
    const userId = req.userId;
    const updatedEntry = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status,
        priority,
        deadline,
        userId,
      },
    });
    return res.status(204).json({ updatedEntry });
  } catch (e) {
    const error = (e as Error).message;
    return res.status(500).json({ error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    // check if the task exists or not
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Invalid Task!" });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });
    return res.status(204).json({msg: "Deleted successfully!"});
  } catch (e) {
    const error = (e as Error).message;
    return res.status(500).json({ error });
  }
};
