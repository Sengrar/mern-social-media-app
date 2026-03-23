import Post from "../models/Post.js";
import PostMedia from "../models/PostMedia.js";
import { formatDate } from "../utils/formateDate.js";

export const postCreate = async (req, res) => {
    try {
        console.log("API HIT");
        console.log("BODY:", req.body);

        const { type, content, media } = req.body;

        if (!type || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!!"
            })
        }

        const post = await Post.create({
            userId: req.user?._id || "67f1a2b3c4d5e6f7a8b9c0d1",
            type,
            content
        });

        let mediaData = [];

        if (media && media.length > 0) {

            for (let item of media) {
                const createMedia = await PostMedia.create({
                    postId: post._id,
                    mediaUrl: item.mediaUrl,
                    mediaType: item.mediaType
                });
                mediaData.push(createMedia);
            }
        }

        res.status(201).json({
            success: true,
            message: "Post Created Successfully!!",
            post,
            media: mediaData
        });


    }
    catch (err) {
        const message = err.response?.data?.message || "something went wrong!!"
        console.log(message);

    }
}

export const postRetrieve = async (req, res) => {
    try {
        let postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found!!"
            });
        }

        const media = await PostMedia.find({ postId });

        res.status(200).json({
            success: true,
            message: "Post retrived successfully!!",
            post,
            media
        });

    }
    catch (err) {
        const message = err.response?.data?.message || "Something Went Wrong!!"
        console.log(message);

    }
}