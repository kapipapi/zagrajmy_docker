import React from "react";
import { Products } from "../models/Products";
import { useGetData } from "../../../hooks/useGetData";
import { NewProductCard, ProductCard } from "./Card";

export const List = () => {

    const products = useGetData<Products>("http://localhost:8080/api/products");

    return <div className={"grid grid-cols-5 gap-5"}>
        {products &&
            products.map((product) => <ProductCard product={product} />)}
        <NewProductCard />
    </div>;
};