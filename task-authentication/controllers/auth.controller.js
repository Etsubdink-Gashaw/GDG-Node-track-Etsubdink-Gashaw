import User from "../model/user.js"
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import RefreshToken from "../model/refreshToken.js";
export const SignUp = async (req, res, next) => {
    try {
        const{name,email,password}=req.body;
        if(!name|| !email|| !password){
            const error= new Error("required credentials incomplete");
            error.statusCode =400;
            throw error;
        }
        const emailExist = await User.findOne({email});
        if (emailExist){
            const error= new Error("User exists already");
            error.statusCode = 409;
            throw error;
        }
        if (password.length <8){
            const error= new Error("Password too short");
            error.statusCode = 409;
            throw error;  
        } 

        const hashed_password=await bycrpt.hash(password,10);
        const newUser= await User.create({name,email,password:hashed_password});
        res.status(201).json({
            success: true,
            data: newUser
        });
        const accessToken = jwt.sign(
            { userId: newUser._id}, 
            process.env.ACCESS_TOKEN_PRIVATE_KEY, 
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_DATE});

        const refreshToken=jwt.sign(
            { userId: newUser._id},
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            {expiresIn: process.env.REFRESH_TOKEN_EXPIRE_DATE});
         res.cookie("accessToken", accessToken,{
            maxAge: 60000 * 15,
            sameSite: "lax",
            httpOnly: true,
            secure: false,
         });
         res.cookie("refreshToken", refreshToken,{
            maxAge: 60000 * 60 * 24 * 30,
            sameSite: "lax",
            httpOnly: true,
            secure: false,
         });    

    } catch (error) {
        next(error);
    }

}
export const SignIn = async (req, res, next) => {
    try {
        const {email, password}= req.body;
        if(!email|| !password){
            const error= new Error("required credentials incomplete");
            error.statusCode =400;
            throw error;
        }
        const user = await User.findOne({email});
        if(!user){
            const error= new Error("User doesnt exist");
            error.statusCode = 404;
            throw error;
        }

        const validPassword= bycrpt.compare(password, user.password);
        if (!validPassword){
            const error = new Error("Invalid credential");
            error.statusCode=401;
            throw error;
        }

        res.status(200).json({
            success: true,
            data:user
        })
    } catch (error) {
        next(error);
    }

}
