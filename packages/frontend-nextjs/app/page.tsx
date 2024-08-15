"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import axios from "axios";
import Timeline from "./components/Timeline";
import PostForm from "./components/PostForm";
import PageContainer from "./components/PageContainer";
import IPost from "./interfaces/Post";
import LoadingPage from "./loading";
import useAuthRedirect from "./hooks/useAuthRedirect";
import { useRouter } from "next/navigation";
import Image from "next/image";
import IProfile from "./interfaces/Profile";

const TimelinePage = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<IProfile | null>(null);

    useAuthRedirect();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/posts", {
                headers: {
                    authorization: localStorage?.getItem("token") ?? "",
                },
            })
            .then((response) => {
                setPosts(response.data);
                setProfile(JSON.parse(localStorage.getItem("profile") ?? "{}"));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(
                    "Error fetching posts:",
                    error.response.data.error
                );
                if (error.response.data.error) {
                    localStorage.removeItem("token");
                    router.push("/login");
                }
            });
    }, [router]);

    const handlePostCreated = (newPost: IPost) => {
        setPosts([newPost, ...posts]);
    };

    const imgSrc =
        "https://avatars.githubusercontent.com/u/34069292?s=400&u=d37d92fb366792d96e368f2c46c1384a0ea510e9&v=4";

    return isLoading ? (
        <LoadingPage />
    ) : (
        <PageContainer>
            <div className="min-h-screen p-4">
                {/* Header do Perfil */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className="flex flex items-center">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-gray-300 mr-6">
                            <Image
                                src={imgSrc}
                                alt="Profile"
                                height="50"
                                width="50"
                                className="rounded-full w-full"
                                priority
                            />
                        </div>
                        <div>
                            <h1 className="text-green-700 text-2xl font-bold">
                                {profile?.name}
                            </h1>
                            <p className="text-green-300">
                                {profile?.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {/* Barra Lateral */}
                    <div className="w-1/4 bg-white shadow-md rounded-lg p-6 mr-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Informações
                        </h2>
                        <ul>
                            <li className="mb-2">
                                <Link
                                    href="/profile"
                                    className="text-green-600 hover:underline mb-4 block text-center"
                                >
                                    Go to Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Área Principal */}
                    <div className="w-3/4 bg-white shadow-md rounded-lg p-6">
                        <div className="m-2">
                            <h2 className="text-xl text-green-500 font-semibold mb-4">
                                New post
                            </h2>
                            <div className="mb-4">
                                <PostForm
                                    onPostCreated={handlePostCreated}
                                    profileId={1}
                                />
                            </div>
                        </div>
                        <div className="m-2">
                            <h2 className="text-xl text-green-500 font-semibold mb-4">
                                Timeline
                            </h2>
                            {/* Aqui você renderiza as postagens do usuário */}
                            <div className="mb-4">
                                {isLoading ? (
                                    <LoadingPage />
                                ) : (
                                    <Timeline posts={posts} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default TimelinePage;
