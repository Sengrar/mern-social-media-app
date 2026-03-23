import Comment from '../models/Comment.js';

export const createComment = async (req,res)=>{
    try{
        console.log("API Hit!!");
        console.log(req.body);
        
        
        const {text, parentCommentId} = req.body;
        const postId = req.params.postId;
        if(!text){
            return res.status(400).json({
                success:false,
                message: "Text field required!!"
            });
        }

        const comment = await Comment.create({
            postId: postId,
            userId: req.user?._id,
            text,
            parentCommentId: parentCommentId || null
        });

        res.status(201).json({
            success:true,
            message: "Comment Created Successfully!!",
            comment
        })
    }
    catch(err){
        const message = err.response?.data?.message || "Something Went Wrong!!";
        console.log(message);
        console.log(err);
        
        
    }
};

export const retrieveComment = async(req,res)=>{
    try{
        console.log("API Hit");
        
        let postId = req.params.postId;
        const comments = await Comment.find({postId}).sort({createdAt: -1});

        // const result = [];

        // for(let comment of comments){

        //     result.push(comment);
        // }

        // ---------------------------------------------------------------------
        const mainComments = comments.filter(c => !c.parentCommentId);
        const replies = comments.filter(c => c.parentCommentId);

        const result = mainComments.map(comment => ({
            ...comment.toJSON(),
            replies: replies.filter(
                r => r.parentCommentId.toString() === comment._id.toString()
            ).map(r => r.toJSON())
        }));
        // ---------------------------------------------------------------------

        res.status(200).json({
            success: true,
            message: "Comments Retrieved Successfully!!",
            data: result
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message: "Something Went Wrong!!"
        });
        
    }
};