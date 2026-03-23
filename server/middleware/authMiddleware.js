import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req,res,next) => {
    let token;
    if(req.cookies?.token){
        token = req.cookies.token;
    } else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({
            success:false,
            message: "Not Authorized, Token Missing!!"
        });
    }

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id).select("-password");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User Not Exist!!"
            });
        }

        req.user = user;

        next();
    }
    catch(err){
        return res.status(401).json({
            success: false,
            message: "Invalid Token!!"
        });
    }
};