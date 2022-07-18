import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "../views/Layout/Layout";

import { Home } from "views/Home/Home";
import { Form } from "../views/NewGameFrom/Form";

export const AppRouter = () => {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="/game/new" element={<Form />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>;
};