import React from "react";

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-green-100">
            <div className="text-center">
                <div
                    className="loader border-t-4 border-green-500 border-solid rounded-full w-16 h-16 mx-auto mb-4"
                    style={{ animation: "spin 1s linear infinite" }}
                ></div>
                <p className="text-lg text-green-700">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
