import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Conectado a MongoDB Atlas correctamente");
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas:", error);
    process.exit(1);
  }
};

export default connectDB;

