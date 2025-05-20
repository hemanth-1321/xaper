import express, { Router } from "express";

import { prisma } from "@repo/DB/client";
import { middleware } from "../middleware";
const router: Router = express.Router();

router.get("/available", async (req, res) => {
  try {
    const availabeTriggers = await prisma.availabeTriggers.findMany();
    res.status(201).json({
      availabeTriggers,
    });
  } catch (error) {
    console.log("error fetching avialbe Triggers", error);
    res.status(500).json({
      message: "error fetching avialbe Triggers",
    });
  }
});

export default router;
