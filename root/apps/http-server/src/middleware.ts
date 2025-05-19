import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log("token recieved", token);
  if (!token) {
    res.status(404).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.id = payload.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "you are not logged in",
    });
  }
};
