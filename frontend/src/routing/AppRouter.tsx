import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "../views/Layout/Layout";

import { Home } from "views/Home/Home";

import { Shop } from "../views/Shop/Shop";
import { Product as ProductInfoPage } from "../views/Shop/components/Product";
import { Form } from "../views/Shop/components/Form/Form";

export const AppRouter = () => {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="shop" element={<Shop />} />
                    <Route path="/shop/new" element={<Form />} />
                    <Route path="/shop/:productId" element={<ProductInfoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>;
};