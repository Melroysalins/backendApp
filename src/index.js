import dotenv from "dotenv";
import { ConnectDB } from "./db/index.js";

dotenv.config({
  path: "./env",
});

ConnectDB();

/* (async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
  } catch (error) {
    console.error("Errr : ", error);
  }
})(); */
