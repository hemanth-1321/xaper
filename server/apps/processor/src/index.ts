import { prisma } from "@repo/DB/client";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-worker",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "zap";
async function main() {
  const producer = kafka.producer();
  await producer.connect();
  while (1) {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => {
        return {
          value: r.zapRunId,
        };
      }),
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((r) => r.id),
        },
      },
    });
  }
}

main();
