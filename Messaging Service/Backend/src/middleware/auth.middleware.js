import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "JsonWebTokenError"
import User from "../models/user.models.js"

export const ProtectRoute = async ( req, res, next) => {
    try {
        const token = req.cookies.jwt
        
        if (!token){
            return res.status(400),json({message:"No valid cookie"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(400),json({message:"invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(400),json({message:"Ooga Booga i listen to chatgpt"})
        }

        req.user = user

        next()
    } catch (error) {
        console.log("Error in protect Route Middleware");
        res.status(400),json({message:"Internal Server error"})
    }
}