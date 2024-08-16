"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Profile from "../components/Profile";
import PageContainer from "../components/PageContainer";
import useAuthRedirect from "../hooks/useAuthRedirect";
import LoadingPage from "../loading";
import { useRouter } from "next/navigation";
import { IProfile } from "../interfaces";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<IProfile | undefined>();
    const router = useRouter();

    useAuthRedirect(setIsLoading);

    useEffect(() => {
        const parsedProfile = JSON.parse(
            localStorage.getItem("profile") ?? "{}"
        );

        if (!parsedProfile) router.push("/logout");

        setProfile(parsedProfile);
    }, [router]);

    return isLoading ? (
        <LoadingPage />
    ) : (
        <PageContainer>
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 text-center">
                    <Link
                        href="/"
                        className="text-green-600 hover:underline mb-4 block"
                    >
                        Back to Timeline
                    </Link>
                    <Profile profile={profile} />
                </div>
            </div>
        </PageContainer>
    );
};

export default ProfilePage;
