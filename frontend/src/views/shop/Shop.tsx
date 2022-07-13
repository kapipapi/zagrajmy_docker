import React from "react";
import { Link, Outlet } from "react-router-dom";
import { List } from "./components/List";

export const Shop = () => {

    return <div className="w-9/12">
        <div className={"mb-5"}>
            <p className={"text-3xl font-semibold m-5"}>GTA V CAR SHOP</p>
        </div>
        <div>
            <List />
            <Outlet />
        </div>
    </div>;
};