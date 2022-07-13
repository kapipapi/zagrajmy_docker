import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
    const styles = {
        link: "hover:text-xl hover:font-bold transition-all"
    };

    return <div>
        <nav className={"flex h-20 space-x-5 p-3 justify-center items-center bg-amber-900 text-neutral-100 text-md"}>
            <Link to={"/"} ><p className={styles.link}>HOME</p></Link>
            <Link to={"/shop"}><p className={styles.link}>SHOP</p></Link>
            <Link to={"/blog"}><p className={styles.link}>BLOG</p></Link>
        </nav>
        <div className={"flex justify-center"}>
            <Outlet />
        </div>
    </div>;
};