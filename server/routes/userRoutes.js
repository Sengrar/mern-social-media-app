import express from 'express'
const router = express.Router();
import { register, login } from '../controllers/userController.js';
import { auth } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);

router.post('/logout', (req,res)=>{
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        success:true,
        message:"User Logout SuccessFully!!!"
    });
});

export default router;