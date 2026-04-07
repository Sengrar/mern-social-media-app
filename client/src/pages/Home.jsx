import { useEffect, useState } from "react";
import API from "../api/axios";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [replyText, setReplyText] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await API.get("/posts");
            setPosts(res.data.data);

            // fetch comments for each post
            res.data.data.forEach(async (item) => {
                const commentRes = await API.get(`/posts/${item.post._id}/comments`);

                setComments(prev => ({
                    ...prev,
                    [item.post._id]: commentRes.data.data
                }));
            });
        };

        fetchPosts();
    }, []);

    // Add Comment
    const handleComment = async (postId) => {
        if (!newComment[postId]) return;

        await API.post(`/posts/${postId}/comments`, {
            text: newComment[postId]
        });

        const res = await API.get(`/posts/${postId}/comments`);

        setComments(prev => ({
            ...prev,
            [postId]: res.data.data
        }));

        setNewComment(prev => ({
            ...prev,
            [postId]: ""
        }));
    };

    // Add Reply
    const handleReply = async (postId, commentId) => {
        if (!replyText[commentId]) return;

        await API.post(`/posts/${postId}/comments`, {
            text: replyText[commentId],
            parentCommentId: commentId
        });

        const res = await API.get(`/posts/${postId}/comments`);

        setComments(prev => ({
            ...prev,
            [postId]: res.data.data
        }));

        setReplyText(prev => ({
            ...prev,
            [commentId]: ""
        }));
    };

    return (
        <div className="w-full max-w-xl px-2 md:px-0 py-6 space-y-8">
            {posts.map((item) => (
                <div key={item.post._id} className="border border-gray-800 rounded-lg">

                    {/* Header */}
                    <div className="flex items-center gap-3 p-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            className="w-8 h-8 rounded-full object-cover"
                            alt="profile"
                        />
                        <p className="font-semibold">username</p>
                    </div>

                    {/* Media */}
                    {item.media.map((m, i) =>
                        m.mediaType === "image" ? (
                            <img
                                key={i}
                                src={m.mediaUrl}
                                alt="media"
                                className="w-full max-h-[500px] object-cover"
                            />
                        ) : (
                            <video key={i} controls className="w-full max-h-[600px]">
                                <source src={m.mediaUrl} type="video/mp4" />
                            </video>
                        )
                    )}

                    {/* Actions */}
                    <div className="p-3 flex justify-between items-center">
                        <div className="flex gap-4">
                            <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                            <MessageCircle className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                            <Send className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                        </div>
                        <Bookmark className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                    </div>

                    {/* Likes */}
                    <p className="px-3 text-sm font-semibold">48 likes</p>

                    {/* Caption */}
                    <p className="px-3 text-sm">
                        <span className="font-semibold mr-2">username</span>
                        {item.post.content}
                    </p>

                    {/* Comments */}
                    <div className="px-3 mt-2">
                        {comments[item.post._id]?.map((c) => (
                            <div key={c._id} className="mb-3">

                                {/* Main Comment */}
                                <p className="text-sm">
                                    <span className="font-semibold mr-2">user</span>
                                    {c.text}
                                </p>

                                {/* Reply Input */}
                                <div className="ml-6 flex gap-2 mt-1">
                                    <input
                                        type="text"
                                        placeholder="Reply..."
                                        className="text-xs bg-transparent border-b border-gray-700 outline-none flex-1"
                                        value={replyText[c._id] || ""}
                                        onChange={(e) =>
                                            setReplyText({
                                                ...replyText,
                                                [c._id]: e.target.value
                                            })
                                        }
                                    />
                                    <button
                                        className="text-blue-400 text-xs"
                                        onClick={() => handleReply(item.post._id, c._id)}
                                    >
                                        Reply
                                    </button>
                                </div>

                                {/* Replies */}
                                <div className="ml-6 mt-2 space-y-1">
                                    {c.replies?.map((r) => (
                                        <p key={r._id} className="text-sm text-gray-400">
                                            <span className="font-semibold mr-2">user</span>
                                            {r.text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Comment */}
                    <div className="px-3 py-2 flex gap-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 bg-transparent border-b border-gray-700 outline-none text-sm"
                            value={newComment[item.post._id] || ""}
                            onChange={(e) =>
                                setNewComment({
                                    ...newComment,
                                    [item.post._id]: e.target.value
                                })
                            }
                        />
                        <button
                            className="text-blue-500 text-sm"
                            onClick={() => handleComment(item.post._id)}
                        >
                            Post
                        </button>
                    </div>

                    {/* Time */}
                    <p className="px-3 pb-3 text-xs text-gray-500">
                        {item.post.createdAt}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Home;