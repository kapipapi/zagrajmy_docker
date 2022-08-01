import React from "react";
import { Link } from "react-router-dom";
import { UserStatus } from "./UserStatus";

type SideMenuProps = {
    isOpen: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const SideMenu = ({ isOpen, setState }: SideMenuProps) => {
    return <div
        className={`transition-all ${isOpen ? "translate-y-20" : "-translate-y-20"} r-lg-display-flex flex-col fixed p-5 space-y-2 text-left r-lg-display-block w-full sm:w-min sm:border-r border-b sm:rounded-br-xl shadow-md bg-white z-10`}>
        <Link to={"/search"}><p className={"text-md whitespace-nowrap"}>- Search games</p></Link>
        <Link to={"/game/new"}><p className={"text-md  whitespace-nowrap"}>- Create game</p></Link>
        <div className={"block md:hidden w-min"}><UserStatus /></div>
    </div>;
};