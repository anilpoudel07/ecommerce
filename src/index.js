import { connectToDB } from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});
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
