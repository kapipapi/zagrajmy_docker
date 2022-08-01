import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserStatus } from "./UserStatus";
import { SideMenu } from "./SideMenu";
import { AiOutlineMenu } from "react-icons/ai";
import { VscChromeClose as Close } from "react-icons/vsc";

export const Layout = () => {

    const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

    return <div className={"flex flex-col h-screen"}>
        <SideMenu isOpen={sideMenuOpen} setState={setSideMenuOpen} />
        <nav className={"flex h-20 p-10 justify-center items-center border-b-2 z-20"}>
            <button className={"relative r-lg-display-block md:mr-8 -mr-2"}
                    onClick={() => setSideMenuOpen(!sideMenuOpen)}>
                {sideMenuOpen ?
                    <Close size={20} />
                    :
                    <AiOutlineMenu size={20} />
                }
            </button>
            <div className={"flex justify-center md:justify-start items-center w-full lg:space-x-12"}>
                <Link to={"/"}><p className={"text-2xl"}>findsquad.com</p></Link>
                <Link to={"/search"}><p className={"text-md r-lg-hidden-block"}>Search games</p></Link>
                <Link to={"/game/new"}><p className={"text-md r-lg-hidden-block"}>Create game</p></Link>
            </div>
            <div className={"r-md-hidden-flex"}>
                <UserStatus />
            </div>
        </nav>
        <div className={"flex justify-center h-full"}>
            <Outlet />
        </div>
    </div>;
};