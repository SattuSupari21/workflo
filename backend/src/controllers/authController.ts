import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib";

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res
        .status(409)
        .json({ status: "error", msg: "User already exists!" });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name: username,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      newUser,
    });
  } catch (e) {
    const error = (e as Error).message;
    return res.status(500).json({ status: "error", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ status: "error", msg: "User not found!" });
    }
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "error", msg: "Invalid Password!" });
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "dhere-dhere-bol-koi-sun-na-le",
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json(token);
  } catch (e) {
    const error = (e as Error).message;
    return res.status(500).json({ status: "error", error });
  }
};

declare global {
  namespace Express {
    interface Request {
      userId: string | JwtPayload;
    }
  }
}

export const middlewareTest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.send(req.userId);
};
