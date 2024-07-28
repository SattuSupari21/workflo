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
