import mongoose from "mongoose";

export class connectToDB {
  connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(
        "mongodb+srv://poudelanil658:anil1234@ecom.x00es.mongodb.net",
      );
      console.log(
        "Connected to the Mongodb Atlas and hostname:",
        connectionInstance.connection.host,
      );
    } catch (e) {
      console.error("Error while connecting to MongoDB Atlas:", e);
    }
  };
}
