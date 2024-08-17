"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PageContainer from "../components/PageContainer";
import LoadingPage from "../loading";
import useAuthRedirect from "../hooks/useAuthRedirect";
import IProfile from "../interfaces/Profile";

const EditProfilePage = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useAuthRedirect();

    useEffect(() => {
        const profileData = JSON.parse(localStorage.getItem("profile") ?? "{}");
        setProfile(profileData);
        setName(profileData.name || "");
        setDescription(profileData.description || "");
        setIsLoading(false);
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (profile) {
            axios
                .put(
                    `${process.env.NEXT_PUBLIC_BACKEND_API}/profiles`,
                    {
                        id: profile.id,
                        name,
                        description,
                    },
                    {
                        headers: {
                            authorization: localStorage?.getItem("token") ?? "",
                        },
                    }
                )
                .then((response) => {
                    localStorage.setItem(
                        "profile",
                        JSON.stringify(response.data)
                    );
                    router.push("/profile");
                })
                .catch((error) => {
                    console.error(
                        "Error updating profile:",
                        error.response?.data?.error
                    );
                    if (error.response?.data?.error) {
                        localStorage.removeItem("token");
                        router.push("/login");
                    }
                });
        }
    };

    return isLoading ? (
        <LoadingPage />
    ) : (
        <PageContainer>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl text-green-500 font-semibold text-center mb-4">
                        Edit Profile
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring focus:border-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring focus:border-green-500"
                                rows={4}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/profile")}
                                className="text-green-500 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PageContainer>
    );
};

export default EditProfilePage;
