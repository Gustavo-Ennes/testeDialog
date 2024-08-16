"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { storeEmailAndProfileFromToken } from "../utils/email";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) router.push("/");
        
        axios
            .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/token-check`, {
                token,
            })
            .then((response) => {
                if (response.data.status == "valid") router.push("/");
            })
            .catch((err) => {
                console.log("Your token was expired. ");
            });
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
                { email, password }
            );
            setIsLoading(false);
            console.log(response);

            if (!response.data.error) {
                localStorage.setItem("token", response.data.token);
                storeEmailAndProfileFromToken();
                router.push("/");
            }
        } catch (error: any) {
            console.error("Error liking post:", error.message);
            setPassword("");
            setLoginError(`login error: ${error.message}`);
            setIsLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => router.push("./signup")

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-semibold text-green-700 mb-6 text-center">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading || !email || !password}
                        className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Login
                    </button> 
                    <h2 className="text-center text-green-500">OR</h2>
                    <button
                        type="submit"
                        onClick={handleSignup}
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-yellow-300 text-green-600 font-semibold rounded-md shadow-sm hover:bg-yellow-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Sign up
                    </button>
                </form>{" "}
                {loginError != "" && (
                    <div className="m-2 bg-red-500 text-white p-3 rounded-lg mb-4">
                        {loginError}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
