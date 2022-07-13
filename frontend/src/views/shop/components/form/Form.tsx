import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./componenets/Input";
import { Product } from "../../models/Products";
import { sendData } from "../../../../hooks/sendData";
import { useNavigate } from "react-router-dom";

type OKResponse = {
    ok: boolean;
}

export const Form = () => {
    const { register, handleSubmit, reset } = useForm<Product>();
    let navigate = useNavigate();

    const onSubmit = async (data: Product) => {
        console.log("data", data);
        let response = await sendData<Product, OKResponse>("http://localhost:8080/api/product/new", data);
        if (response.ok) {
            reset();
            navigate("/shop");
        }
    };

    return <div className={"fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-30"}>
        <div className={"absolute bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"}>
            <p className={"text-xl font-semibold mb-5"}>New product form</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input name={"name"} type={"text"} register={register} required />
                <Input name={"quantity"} type={"number"} register={register} required />
                <Input name={"photoUrl"} label={"Photo URL"} type={"text"} register={register} required />
                <Input name={"price"} type={"number"} register={register} required />

                <div className={"flex justify-around"}>
                    <button
                        className={"bg-orange-400 rounded w-36 h-16"}
                        type={"reset"}
                        onClick={() => navigate("/shop")}
                    >
                        CANCEL
                    </button>
                    <button className={"bg-green-300 rounded w-36 h-16"} type={"submit"}>SUBMIT</button>
                </div>
            </form>
        </div>
    </div>;
};