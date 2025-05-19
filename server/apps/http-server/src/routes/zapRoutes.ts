import express, { Router } from "express";

import { prisma } from "@repo/DB/client";
import { ZapCreateSchema } from "../types";
import { middleware } from "../middleware";
const router: Router = express.Router();

router.post("/", middleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const parsedData = ZapCreateSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(404).json({
      message: "Invalid inputs",
    });
    return;
  }
  try {
    const zapId = await prisma.$transaction(async (tx) => {
      const zap = await prisma.zap.create({
        data: {
          userId: id,
          triggerId: "",
          Action: {
            create: parsedData.data.actions.map((x, index) => ({
              actionId: x.availbeActionId,
              sortingOrder: index,
            })),
          },
        },
      });

      const trigger = await tx.trigger.create({
        data: {
          triggerId: parsedData.data.AvailabeTriggerId,
          zapId: zap.id,
        },
      });
      await prisma.zap.update({
        where: {
          id: zap.id,
        },
        data: {
          triggerId: trigger.id,
        },
      });
      return zap.id;
    });
    res.status(200).json({
      zapId,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "error creating zap",
    });
  }
});

router.get("/", middleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  try {
    const zaps = await prisma.zap.findMany({
      where: {
        userId: id,
      },
      include: {
        Action: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    res.status(201).json({
      zaps,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "error getting zap",
    });
  }
});

router.get("/:zapId", middleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const zapId = req.params.zapId;
  try {
    const zap = await prisma.zap.findFirst({
      where: {
        id: zapId,
        userId: id,
      },
      include: {
        Action: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    res.status(201).json({
      zap,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "error getting user zap",
    });
  }
});

export default router;
