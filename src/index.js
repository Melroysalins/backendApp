import dotenv from "dotenv";
import { ConnectDB } from "./db/index.js";
import { app } from "./app.js";
import e from "express";

dotenv.config({
  path: "./env",
});

ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 6000, () => {
      console.log("Server started runing...", process.env.PORT);
    });
    app.on("error", (error) => {
      console.log("ERROR :", error);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed !! ", err);
  });
