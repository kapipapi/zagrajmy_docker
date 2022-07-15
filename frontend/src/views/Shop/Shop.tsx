import React, { useState } from "react";
import { ProductList } from "./components/ProductList";
import { SideMenu, SideMenuForm } from "./components/SideMenu";

export const Shop = () => {
    const [form, setForm] = useState<SideMenuForm>();

    return <div className="grid grid-cols-4 w-9/12">
        <div className={"mb-5 col-span-4"}>
            <p className={"text-3xl font-semibold m-5"}>Find your style</p>
        </div>
        <div className={"flex col-span-1"}>
            <SideMenu setForm={setForm} />
        </div>
        <div className={"col-span-3"}>
            <ProductList form={form} />
        </div>
    </div>;
};