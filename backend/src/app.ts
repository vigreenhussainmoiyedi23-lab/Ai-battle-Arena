import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.send("OK");
});

export default app;
