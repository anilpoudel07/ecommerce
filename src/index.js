import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connectToDB } from "./db/index.js";

import { app } from "./app.js";
const PORT = process.env.PORT || 4000;
const connect = new connectToDB();
connect
  .connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever is listening to port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Error while connecting to MongoDB", e);
  });
