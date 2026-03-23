import Post from "../models/Post.js";
import PostMedia from "../models/PostMedia.js";

export const getAllPost = async (req,res)=>{
    try{
        const posts = await Post.find().sort({createdAt: -1});

        const result = [];

        for(let post of posts){
            const media = await PostMedia.find({postId: post._id});

            result.push({
                post,
                media
            });
        }

        res.status(200).json({
            success:true,
            message: "All posts Retrieved Successfully!!",
            data: result
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message: "Something Went Wrong!!"
        });
        
    }
};