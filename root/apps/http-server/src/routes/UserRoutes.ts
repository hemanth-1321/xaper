import express, { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "@repo/DB/client";
import { SigninSchema, SignupSchema } from "../types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { middleware } from "../middleware";
const router: Router = express.Router();

router.post("/signup", async (req, res) => {
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(404).json({
      message: "Invalid inputs",
    });
    return;
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: parsedData.data?.email,
      },
    });
    if (existingUser) {
      res.status(404).json({
        message: "User exists,Please Login",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(parsedData.data.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: parsedData.data.email,
        name: parsedData.data.name,
        password: hashpassword,
      },
    });
    res.status(201).json({
      newUser,
    });
  } catch (error) {
    console.log("error creating user", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(404).json({
      message: "Invalid inputs",
    });
    return;
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    const isPassword = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );
    if (!isPassword) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json({
      token,
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/user", middleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  console.log(id);

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
      },
    });
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log("error gettig user details", error);
    res.status(500).json({
      message: "Failed to fetch user details",
    });
  }
});

export default router;
