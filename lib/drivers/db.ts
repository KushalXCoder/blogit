import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB: ${connection.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}