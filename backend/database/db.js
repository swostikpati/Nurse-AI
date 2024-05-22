import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection URI
// const mongoURI = process.env.MONGODB_URI;
const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.p2sgopu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

// Export the connection
export default connectDB;
