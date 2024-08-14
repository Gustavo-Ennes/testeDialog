import React from "react";
import Post from "./Post";
import { IPost } from "@/app/interfaces";

const Timeline = ({ posts }: { posts: IPost[] }) => {
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
