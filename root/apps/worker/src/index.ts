import { prisma } from "@repo/DB/client";
import { Kafka } from "kafkajs";
const kafka = new Kafka({
  clientId: "outbox-worker",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "zap";
async function main() {
  const consumer = kafka.consumer({
    groupId: "worker",
  });
  await consumer.connect();

  await consumer.subscribe({
    topic: TOPIC_NAME,
    fromBeginning: true,
  });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        partition,
        value: message.value?.toString(),
      });
      await new Promise((r) => setTimeout(r, 1000));

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
      console.log("proccess done");
    },
  });
}

main();
