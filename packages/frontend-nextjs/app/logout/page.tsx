"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("profile");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        router.push("/login");
    });

    return null;
};

export default Logout;
