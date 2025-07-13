import mongoose from 'mongoose';
import 'dotenv/config'
export const connectDB = async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
        const connection = mongoose.connection;
        connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err.message}`);
        });
    } catch (error) {
        console.log("error while connecting to database");
        process.exit(1);
    }
}