"use client";

import React, { useState } from "react";
import Link from "next/link";
import Profile from "../components/Profile";
import PageContainer from "../components/PageContainer";
import useAuthRedirect from "../hooks/useAuthRedirect";
import LoadingPage from "../loading";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    useAuthRedirect(setIsLoading);
    
    return isLoading ? <LoadingPage/> : (
        <PageContainer>
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 text-center">
                    <Link
                        href="/"
                        className="text-green-600 hover:underline mb-4 block"
                    >
                        Back to Timeline
                    </Link>
                    <Profile />
                </div>
            </div>
        </PageContainer>
    );

}

export default ProfilePage;
