
import express from 'express';
import dotenv from 'dotenv';
import { errorHandler}from './middleware/errorHandler.js';
import connectDB from './config/dbConfig.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
const app= express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/v1/auth",authRouter)
app.use("/user",userRouter)
app.use(errorHandler)
app.listen(5500,()=>{
    connectDB();
    console.log('Server is listening on port 5500...')
}) 