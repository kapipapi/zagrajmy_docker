import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/useGetData";
import { Product as ProductModel } from "../models/Products";

export const Product = () => {
    const { productId } = useParams();

    const product = useGetData<ProductModel>(`http://localhost:8080/api/product/${productId}`);

    if (product === undefined) return <div>Loading...</div>;

    return <div className={"grid justify-center grid-cols-2 mt-12"}>
        <div className={"col-span-2"}>
            <Link to={"/shop"}><p className={"text-xl"}>Back to shop</p></Link>
        </div>
        <div className={"flex justify-end"}>
            <img src={product.photoUrl} width={500} alt={product.name} className={"m-5"} />
        </div>
        <div className={"flex flex-col mt-5"}>
            <p>
                <span className={"text-2xl"}>{product.name}</span> (#{product.id})
            </p>
            <p className={"text-xl"}>{product.price}$</p>
        </div>
    </div>;
};