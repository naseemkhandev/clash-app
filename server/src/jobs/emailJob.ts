import { Queue, Worker } from "bullmq";
import { defaultJobOptions, redisConnection } from "../config/queue.js";
import { sendMail } from "../config/emali.js";

export const emailQueueName = "emailQueue";

interface EmailJobData {
  to: string;
  subject: string;
  body: string;
}

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions,
});

export const queueWorker = new Worker(
  emailQueueName,
  async (job) => {
    const data: EmailJobData = job.data;
    await sendMail(data.to, data.subject, data.body);
  },
  {
    connection: redisConnection,
  }
);
