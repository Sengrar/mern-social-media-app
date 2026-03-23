import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!name || name < 3) {
            return res.status(400).json({
                success: false,
                message: "Name field is required and must be contain atleast 3 charachter"
            })
        }

        let passRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/


        if (!passRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Greater than 8 characters length,2 letters in Upper Case,1 Special Character (!@#$&*),2 numerals (0-9),3 letters in Lower Case"
            })
        }

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User Aleady Exists!!"
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1D" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.status(201).json({
            success: true,
            message: "User Registered Successfully!!"
        })

    }
    catch (err) {
        const message = err.response?.data?.message || "Something went wrong";

        console.log(message);

    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const userExist = await User.findOne({ email })

        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "User not exist, Invalid Credential!!"
            })
        }

        const isMatch = await bcryptjs.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = jwt.sign(
            { id: userExist._id },
            process.env.JWT_SECRET,
            { expiresIn: "1D" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({
            success: true,
            message: "User Login Successfully!!"
        });
    }
    catch(err){
        const message = err.response?.data?.message || "Something went wrong!!"
        console.log(message);
        
    }
};