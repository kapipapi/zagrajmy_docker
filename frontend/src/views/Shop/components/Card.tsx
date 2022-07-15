import React from "react";
import { Product } from "../models/Products";
import { Link } from "react-router-dom";

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return <Link to={`/shop/${product.id}`}>
        <div className={"flex flex-col p-2 group"}>
            <div className={"flex w-full justify-center mb-5 relative overflow-clip rounded-lg"}>
                <img src={product.mainPhotoUrl} alt={product.name} className={"rounded-lg"} />
                <p className={"absolute bottom-2 right-2"}>
                    <span className={"relative text-md text-red-600 line-through"}>{product.price + 2}$</span>
                    <span className={"relative text-xl ml-2"}>{product.price}$</span>
                </p>
            </div>

            <p className={"text-xl group-hover:font-bold mb-5 ml-5"}>{product.name}</p>
        </div>
    </Link>;
};