"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";

type TSetIsLoading = Dispatch<SetStateAction<boolean>> | null;

const useAuthRedirect = (setIsLoading: TSetIsLoading = null) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) router.push("/login");

        if (setIsLoading != null) setIsLoading(false);
    }, [router, setIsLoading]);
};

export default useAuthRedirect;
