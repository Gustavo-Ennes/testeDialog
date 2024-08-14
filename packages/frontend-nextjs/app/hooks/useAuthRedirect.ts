"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }
    });
};

export default useAuthRedirect;
