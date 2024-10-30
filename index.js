import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import { initDb } from "./db/connection.js";
import productRouter from "./routes/products.js";
import authRouter from "./routes/authRouter.js";
import CategoryRouter from "./routes/CategoryRouter.js";
import { createProxyMiddleware } from "http-proxy-middleware";
import bodyParser from "body-parser";
import driveRouter from "./routes/googleDriveRoute.js";
// import driveRouter from "./controller/googleDrive.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use(compression());
// Increase payload size limit to 100MB
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Your route handlers and other middleware

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,
  })
);

app.use("/auth", authRouter);
app.use("/category", CategoryRouter);
app.use("/product", productRouter);
app.use("/drive", driveRouter);

app.listen(process.env.PORT, async () => {
  await initDb();
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
