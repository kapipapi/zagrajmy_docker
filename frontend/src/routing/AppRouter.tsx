import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "../views/Layout/Layout";

import { Home } from "views/home/Home";

import { Blog } from "../views/blog/Blog";

import { Shop } from "../views/shop/Shop";
import { Form as NewProductForm } from "views/shop/components/form/Form";
import { Product as ProductInfoPage } from "../views/shop/components/Product";

export const AppRouter = () => {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="blog" element={<Blog />} />

                    <Route path="shop" element={<Shop />}>
                        <Route path="new" element={<NewProductForm />} />
                    </Route>
                    <Route path="/shop/:productId" element={<ProductInfoPage />} />

                </Route>
            </Routes>
        </BrowserRouter>
    </div>;
};