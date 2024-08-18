import React, { useEffect } from "react";
import Post from "./Post";
import { IPost } from "@/app/interfaces";

const Timeline = ({
    posts,
    onWebSocketMessage,
}: {
    posts: IPost[];
    onWebSocketMessage: (newPost: IPost) => void;
}) => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET ?? "");

    useEffect(() => {
        socket.addEventListener("message", (event) => {
            const newPost = JSON.parse(event.data);
            onWebSocketMessage(newPost);
        });
    });

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <div className="space-y-4">
                {posts.map((post: IPost) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
