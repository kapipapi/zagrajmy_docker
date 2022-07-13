import React from "react";
import { Menu } from "./components/Menu";
import { Wall } from "./components/Wall";

export const Blog = () => {
    return <div className={"w-1/2 bg-slate-100"}>
        <Menu />
        <Wall />
    </div>;
};