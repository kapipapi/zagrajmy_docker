import React from "react";
import { Link } from "react-router-dom";
import { UserStatus } from "./UserStatus";

type SideMenuProps = {
    isOpen: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const SideMenu = ({ isOpen, setState }: SideMenuProps) => {
    return <div
        className={`transition-all r-lg-display-flex flex-col fixed top-20 p-5 space-y-2 text-left r-lg-display-block border-r border-b rounded-br-xl shadow-md z-10 bg-white ${isOpen ? "left-0" : "-left-48"}`}>
        <Link to={"/search"}><p className={"text-md"}>- Search games</p></Link>
        <Link to={"/game/new"}><p className={"text-md"}>- Create game</p></Link>
        <div className={"block md:hidden"}><UserStatus /></div>
    </div>;
};