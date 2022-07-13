import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./componenets/Input";
import { Product } from "../../models/Products";
import { sendData } from "../../../../hooks/sendData";

type OKResponse = {
    ok: boolean;
}

type FormProps = {
    closeForm: () => void;
}

export const Form = ({ closeForm }: FormProps) => {
    const { register, handleSubmit, reset } = useForm<Product>();

    const onSubmit = async (data: Product) => {
        console.log("data", data);
        let response = await sendData<Product, OKResponse>("http://localhost:8080/api/product/new", data);
        if (response.ok) {
            reset();
            closeForm();
        }
    };

    return <div className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 mx-auto"}>
        <p className={"text-xl font-semibold mb-5"}>New product form</p>
        <form onSubmit={handleSubmit(onSubmit)}>

            <Input name={"name"} type={"text"} register={register} />
            <Input name={"quantity"} type={"number"} register={register} />
            <Input name={"photoUrl"} label={"Photo URL"} type={"text"} register={register} />
            <Input name={"price"} type={"number"} register={register} />

            <button className={"bg-green-300 rounded w-40"}>SUBMIT</button>
        </form>
    </div>;
};