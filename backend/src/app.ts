import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import AiRouter from "./routes/ai.routes.js";
import cors from "cors";
import config from "./configs/config.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/AI", AiRouter);

const distPath = path.join(__dirname, "../public/dist");
app.use(express.static(distPath));
app.get("*name", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
export default app;
