import { Router } from "express";
import { dashboard } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const userRouter = Router();
userRouter.get("/dashboard", authenticate, dashboard);
export default userRouter;