import {SignUp, SignIn, logout } from "../controllers/auth.controller.js"
import { Router } from "express"

const authRouter= Router();
authRouter.post('/signUp', SignUp);
authRouter.post('/signIn', SignIn);
authRouter.post('/logout', logout);


export default authRouter;