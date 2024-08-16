import React from "react";
import Image from "next/image";
import { IProfile } from "../interfaces";

function Profile({ profile }: { profile?: IProfile }) {
    const imgSrc =
        "https://avatars.githubusercontent.com/u/34069292?s=400&u=d37d92fb366792d96e368f2c46c1384a0ea510e9&v=4";

    return (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg  w-full max-w-2xl mx-auto">
            <div className="relative">
                <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-green-200">
                    <Image
                        src={imgSrc}
                        alt="Profile"
                        height={128}
                        width={128}
                        priority
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-2xl text-dark font-bold text-gray-800">
                    {profile?.name}
                </h2>
                <p className="text-gray-600 mt-2">{profile?.description}</p>
                <ul className="mt-4 space-y-2">
                    <li className="text-green-600 hover:underline cursor-pointer">
                        Edit Profile
                    </li>
                    <li className="text-green-600 hover:underline cursor-pointer">
                        Settings
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;
