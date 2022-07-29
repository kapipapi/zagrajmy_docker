import React from "react";
import { Link, Outlet } from "react-router-dom";
import { UserStatus } from "./UserStatus";

export const Layout = () => {
    return <div className={"flex flex-col h-screen"}>
        <nav className={"flex h-20 p-10 justify-center items-center border-b-2"}>
            <div className={"flex justify-start items-center w-full space-x-12"}>
                <Link to={"/"}><p className={"text-2xl"}>findsquad.com</p></Link>
                <span className={"md:hidden"}>
                    <Link to={"/search"}><p className={"text-md"}>Search games</p></Link>
                    <Link to={"/game/new"}><p className={"text-md"}>Create game</p></Link>
                </span>
            </div>
            <UserStatus />
        </nav>
        <div className={"flex justify-center h-full"}>
            <Outlet />
        </div>
    </div>;
};