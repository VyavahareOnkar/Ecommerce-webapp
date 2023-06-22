import { app } from "./app.js";

import dotenv from "dotenv";

import { connectDB } from "./config/database.js";

dotenv.config({ path: "backend/config/config.env" });

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to Uncaught Exception");

  process.exit(1);
});

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`The server is created at http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
