import jwt from "jsonwebtoken";
import User from "../model/user.js";
export const authenticate = async (req, res, next) => {
    try {
        const access_token = req.cookies.accessToken;
        if (!access_token) {
            const error = new Error("Access token not found");
            error.statusCode = 401;
            throw error;
        }
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }   
}

export const logout = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refreshToken;
        if (!refresh_token) {
            const error = new Error("Refresh token not found");
            error.statusCode = 401;
            throw error;
        }
        
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};