import mongoose from "mongoose";

export class connectToDB {
  connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB successfully.", connectionInstance);
    } catch (e) {
      console.error("Error while connecting to MongoDB Atlas:", e);
    }
  };
}
