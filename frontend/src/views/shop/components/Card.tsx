import React from "react";
import { Product } from "../models/Products";

type ProductCardProps = {
    product: Product
}
export const ProductCard = ({ product }: ProductCardProps) => {
    return <div className={"flex flex-col p-2 border rounded-xl"}>
        <p>{product.name}</p>
        <img src={product.photoUrl} width={200} alt={product.name} />
        <p className={"text-right"}><span className={"text-sm text-red-600 line-through"}>{Math.floor(product.price*(Math.random()+1))}$</span> {product.price}$</p>
    </div>;
};