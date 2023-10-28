import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            req.user = await User.findById(decoded.userId).select("-password")
            next();
        }
        catch (e) {
            res.status(401)
            throw new Error('Not Authorized,Invalid Token')
        }
    }
    else {
        res.status(401)
        throw new Error('Not Authorized,No Token')
    }
});


export { protect };