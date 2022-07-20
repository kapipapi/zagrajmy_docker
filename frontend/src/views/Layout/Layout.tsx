import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
    const styles = {
        link: ""
    };

    return <div className={"flex flex-col h-screen"}>
        <nav className={"flex h-20 p-10 justify-center items-center border-b-2"}>
            <div className={"flex justify-start items-center w-full"}>
                <Link to={"/"}><p className={styles.link + " text-2xl"}>findsquad.com</p></Link>
            </div>
        </nav>
        <div className={"flex justify-center h-full"}>
            <Outlet />
        </div>
    </div>;
};