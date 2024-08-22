import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { sendMail } from "./config/emali.js";
import { getCurrentDate, getCurrentTime } from "./utils/getCurrentDateTime.js";

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

    await sendMail("powiyef230@kwalah.com", "Test Email", html);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    if (error.responseCode === 502) {
      return res.status(502).json({
        message: "SMTP account not activated. Please contact support.",
      });
    }
    return res
      .status(500)
      .json({ message: "An error occurred while sending the email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
