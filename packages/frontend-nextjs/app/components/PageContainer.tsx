import React, { ReactElement } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const PageContainer = ({ children }: { children: ReactElement }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
            <div className="container mx-auto max-w-screen-lg">{children}</div>
        </div>
    );
};

export default PageContainer;
