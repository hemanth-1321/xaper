import express from "express";
import { prisma } from "@repo/DB/client";

const app = express();
app.use(express.json());
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          zapId: zapId,
          metadata: body,
        },
      });
      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });
    res.json({
      nessage: "webhook recived",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wroing",
    });
  }
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
