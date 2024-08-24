import { ConnectionOptions, DefaultJobOptions } from "bullmq";

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
};

export const defaultQueueOptions: DefaultJobOptions = {
  removeOnComplete: {
    count: 20, // Remove job after 20 successful completions
    age: 60 * 60, // Remove job after 1 hour
  },
  attempts: 3, // Retry job 3 times
  backoff: {
    type: "exponential",
    delay: 3000,
  },
  removeOnFail: false, // Keep job in failed state for debugging purposes
};
