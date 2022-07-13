import React from "react";

export const Menu = () => {
    return <div className={"flex space-x-4 p-2"}>
        <button className={"rounded bg-lime-300"}>Refresh</button>
        <button>New post</button>
    </div>;
};