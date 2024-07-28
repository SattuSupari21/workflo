import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

// eg. decodedToken ->
// {
//   userId: '66a5e9e9c7527415972b6252',
//   iat: 1722153150,
//   exp: 1722156750
// }

export interface TokenInterface {
  userId: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized Access!" });
  }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "dhere-dhere-bol-koi-sun-na-le",
    ) as TokenInterface;
    req.userId = decodedToken.userId;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};
