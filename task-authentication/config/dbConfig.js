import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async()=>{
    await mongoose.connect(process.env.mongoDB_url)
    .then((result)=>console.log("MongoDB connected successfully"))
    .catch((err)=>console.log("Error connecting to MongoDB:", err))
}
export default connectDB;