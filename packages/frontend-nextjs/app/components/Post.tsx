import React, { useState } from "react";
import axios from "axios";
import { IPost } from "@/app/interfaces";

const Post = ({ post }: { post: IPost }) => {
    const [likes, setLikes] = useState(post.likes);

    const handleLike = () => {
        axios
            .get(`http://localhost:5000/api/posts/${post.id}/like`, {
                headers: { Authorization: localStorage.getItem("token") ?? "" },
            })
            .then((response) => setLikes(likes + 1))
            .catch((error) => console.error("Error liking post:", error));
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
            <p className="text-gray-800 text-lg">{post.text}</p>
            <div
                className="flex items-center mt-4 cursor-pointer text-green-600 hover:text-green-800"
                onClick={handleLike}
            >
                <span role="img" aria-label="like" className="mr-2">
                    👍
                </span>
                {likes}
            </div>
        </div>
    );
};

export default Post;
