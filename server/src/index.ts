import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { getCurrentDate, getCurrentTime } from "./utils/getCurrentDateTime.js";
import { emailQueue, emailQueueName } from "./jobs/emailJob.js";
import "./jobs/index.js";
import authRoutes from "./routes/auth.routea.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Get current directory

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", async (req: Request, res: Response) => {
  try {
    const html = await ejs.renderFile(__dirname + "/views/emails/email.ejs", {
      name: "Naseem Khan",
      date: getCurrentDate(),
      time: getCurrentTime(),
      year: new Date().getFullYear(),
    });

    await emailQueue.add(emailQueueName, {
      to: "kesoji2118@inpsur.com",
      subject: "Test Email",
      body: html,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
