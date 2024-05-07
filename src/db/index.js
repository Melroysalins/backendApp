import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

export const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );
    console.log(
      "MongoDb Database Connected",
      connectionInstance.connection.host
    );
    return connectionInstance;
  } catch (error) {
    console.error("ERRR:", error);
    process.exit(1);
  }
};
