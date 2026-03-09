import {SignUp, SignIn } from "../controllers/auth.controller.js"
import { Router } from "express"

const authRouter= Router();
authRouter.post('/signUp', SignUp);
authRouter.post('/signIn', SignIn);


export default authRouter;