import React, { ReactElement } from "react";

const PageContainer = ({ children }: {children: ReactElement}) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
            <div className="container mx-auto max-w-screen-lg rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    );
};

export default PageContainer;
