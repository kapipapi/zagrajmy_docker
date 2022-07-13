import React from "react";
import { Product } from "../models/Products";
import { Link } from "react-router-dom";

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return <Link to={`/shop/${product.id}`}>
        <div className={"flex flex-col p-2 rounded-md shadow-md hover:shadow-lg transition-all group hover:bg-amber-400"}>
            <p className={"text-xl group-hover:font-bold group-hover:text-amber-900 mb-5 ml-5"}>{product.name}</p>

            <div className={'flex w-full justify-center'}>
                <img src={product.photoUrl} width={200} alt={product.name} className={"rounded-md shadow-lg"} />
            </div>

            <p className={"text-right"}>
                <span className={"text-sm text-red-600 line-through"}>{Math.floor(product.price * (Math.random() + 1))}$</span>
                <span className={"text-xl"}>{product.price}$</span>
            </p>
        </div>
    </Link>;
};

export const NewProductCard = () => {
    return <Link to={`/shop/new`}>
        <div className={"flex flex-col p-2 rounded-md shadow-md hover:shadow-lg transition-all group hover:bg-green-300 h-full"}>
            <p className={"text-xl group-hover:font-bold group-hover:text-green-900 mb-5 ml-5"}>NEW!</p>

            <div className={'flex w-full h-full justify-center items-center'}>
                <p className={'mb-10 text-4xl'}>+</p>
            </div>
        </div>
    </Link>;
}