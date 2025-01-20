import { Loader } from "lucide-react";
import React from "react";

const LoadingComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen m-1 p-2 gap-4">
            <Loader className="h-25 w-25 text-orange-500 animate-spin" />
        </div>
    );
};

export default LoadingComponent;
