import React, { useState } from "react";
import axios from "axios";
import { IPost } from "@/app/interfaces";
import { animateCSS } from "../utils/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post }: { post: IPost }) => {
    const [likes, setLikes] = useState(post.likes);

    const handleLike = () => {
        axios
            .get(
                `${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${post.id}/like`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token") ?? "",
                    },
                }
            )
            .then((_) => setLikes(likes + 1))
            .catch((error) => console.error("Error liking post:", error));

        animateCSS(".like", "rubberBand");
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4">
            <p className="text-gray-800 text-lg">{post.text}</p>
            <div
                className="flex items-center mt-4 cursor-pointer text-green-600"
                onClick={handleLike}
            >
                <span
                    role="img"
                    aria-label="like"
                    className="mr-2 like text-blue-600 hover:text-blue-500"
                >
                    <FontAwesomeIcon icon={faThumbsUp} className="fa-fw" />
                </span>
                {likes}
            </div>
        </div>
    );
};

export default Post;
