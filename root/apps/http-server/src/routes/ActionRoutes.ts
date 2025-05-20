import express, { Router } from "express";

import { prisma } from "@repo/DB/client";
import { middleware } from "../middleware";
const router: Router = express.Router();

router.get("/available", async (req, res) => {
  try {
    const availabeActions = await prisma.availabeAction.findMany();
    res.status(201).json({
      availabeActions,
    });
  } catch (error) {
    console.log("error fetching avialbe actions", error);
    res.status(500).json({
      message: "error fetching avialbe actions",
    });
  }
});

export default router;
