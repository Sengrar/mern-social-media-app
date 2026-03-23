import { useEffect, useState } from "react";
import API from "../api/axios";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await API.get("/posts");
            setPosts(res.data.data);
        };
        fetchPosts();
    }, []);

    return (
        <div className="w-full max-w-xl px-2 md:px-0 py-6 space-y-8">
            {posts.map((item) => (
                <div key={item.post._id} className="border border-gray-800 rounded-lg">

                    {/* Header */}
                    <div className="flex items-center gap-3 p-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                        <p className="font-semibold">username</p>
                    </div>

                    {/* Media */}
                    {item.media.map((m, i) =>
                        m.mediaType === "image" ? (
                            <img
                                key={i}
                                src={m.mediaUrl}
                                alt="media"
                                className="w-full max-h-[500px] object-cover rounded-md"
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