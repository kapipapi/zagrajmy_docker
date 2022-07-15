import React from "react";
import { Products } from "../models/Products";
import { useGetData } from "../../../hooks/useGetData";
import { ProductCard } from "./Card";
import { SideMenuForm } from "./SideMenu";

type ProductListProps = {
    form?: SideMenuForm;
}

export const ProductList = ({ form = undefined }: ProductListProps) => {

    let productURL = new URLSearchParams();
    if (form?.category !== undefined) productURL.append("category", form.category);

    const products = useGetData<Products>("http://localhost:8080/api/products", productURL);

    return <div className={"grid grid-cols-4 gap-5"}>
        {products &&
            products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>;
};