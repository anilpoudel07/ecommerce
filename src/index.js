import express from "express";
import { connectToDB } from "./db/index.js";
const PORT = 8002;
import dotenv from "dotenv";
dotenv.config();
const app = express();
const connect = new connectToDB();
connect
  .connectDB()
  .then(() => {
    console.log("Connected to the Mongodb");

    app.listen(() => {
      console.log(`Sever is listening to port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Error while connecting to MongoDB", e);
  });
