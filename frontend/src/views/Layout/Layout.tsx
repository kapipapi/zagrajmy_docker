import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
    const styles = {
        link: ""
    };

    return <div className={"flex flex-col"}>
        <nav className={"flex h-18 p-3 justify-center items-center bg-green-700 text-neutral-100 text-md"}>
            <div className={"flex justify-start items-center w-9/12 space-x-5"}>
                <Link to={"/"}><p className={styles.link + " text-xl font-bold"}>Let's play!</p></Link>
                <p>|</p>
                <Link to={"/game/new"}><p className={styles.link}>NEW GAME</p></Link>
            </div>
        </nav>
        <div className={"flex justify-center"}>
            <Outlet />
        </div>
    </div>;
};