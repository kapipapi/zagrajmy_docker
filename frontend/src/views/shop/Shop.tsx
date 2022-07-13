import React, { useState } from "react";
import { Form } from "./components/form/Form";
import { List } from "./components/List";

export const Shop = () => {
    const [isFormOpen, setFormOpen] = useState(false);

    return <div className="w-9/12">
        <div className={"mb-5"}>
            <p className={"text-xl underline"}>GTA V CAR SHOP</p>
            <button className={"bg-rose-300 p-2 text-md"}
                    onClick={() => setFormOpen(!isFormOpen)}>{isFormOpen ? "Car list" : "Add car"}</button>
        </div>
        <div>
            {
                isFormOpen ? <Form closeForm={() => setFormOpen(false)} /> : <List />
            }
        </div>
    </div>;
};