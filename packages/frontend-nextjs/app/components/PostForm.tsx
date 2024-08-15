import React, { FormEvent, useState } from "react";
import axios from "axios";
import IPostFormParams from "../interfaces/PostForm";

function PostForm({ onPostCreated, profileId }: IPostFormParams) {
    const [text, setText] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!text) return;

        try {
            const response = await axios.post(
                "http://localhost:5000/api/posts",
                {
                    text,
                    profileId,
                },
                {
                    headers: {
                        authorization: localStorage.getItem("token") ?? "",
                    },
                }
            );
            setText("");
            if (onPostCreated) {
                onPostCreated(response.data);
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-green-50 p-4 rounded-lg shadow-md"
        >
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                className="text-black w-full p-2 border-2 border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
            <button
                type="submit"
                className="mt-3 w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                Post
            </button>
        </form>
    );
}

export default PostForm;
