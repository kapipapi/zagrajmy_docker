import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const LoadingPage = () => {
    return (
        <div className={"w-full h-screen flex justify-center items-center"}>
            <div className={"animate-spin"}>
                <AiOutlineLoading size={50}/>
            </div>
        </div>
    );
};