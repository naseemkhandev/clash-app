import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Get current directory

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", (req: Request, res: Response) => {
  return res.render("test", { title: "Home" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
