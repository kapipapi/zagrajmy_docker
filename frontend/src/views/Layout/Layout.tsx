import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
    const styles = {
        link: "hover:font-bold transition-all"
    };

    return <div className={"flex flex-col"}>
        <nav className={"flex h-18 p-3 justify-center items-center bg-amber-900 text-neutral-100 text-md"}>
            <div className={"flex justify-start items-center w-9/12 space-x-5"}>
                <Link to={"/"}><p className={styles.link + " text-xl"}>HOME</p></Link>
                <p>|</p>
                <Link to={"/shop"}><p className={styles.link}>SHOP</p></Link>
                <p>|</p>
                <Link to={"/shop/new"}><p className={styles.link}>NEW PRODUCT</p></Link>
            </div>
        </nav>
        <div className={"flex justify-center"}>
            <Outlet />
        </div>
    </div>;
};