import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import 'dotenv/config';
const port = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get('/', (req,res)=>{
    res.send("Hello!")
});

app.get('/api/test', (req,res)=>{
    console.log("Test API Hit!!");
    
    res.json({
        success: true,
        message: "Backend Working✅"
    })
});


app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/posts/:postId/comments', commentRouter);

app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}/`);
    
});