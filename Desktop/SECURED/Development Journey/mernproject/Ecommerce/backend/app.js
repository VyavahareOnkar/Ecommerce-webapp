import express from "express";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js"
import cookieParser from "cookie-parser";

export const app = express();

import errorMiddleware from "./middlewares/error.js";
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);

// middleware for error

app.use(errorMiddleware);
