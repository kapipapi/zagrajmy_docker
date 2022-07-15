import React from "react";
import { useForm } from "react-hook-form";
import { ImageUploadInput, Input } from "./componenets/Input";
import { NewProductForm, Product } from "../../models/Products";
import { sendData } from "../../../../hooks/sendData";
import { useNavigate } from "react-router-dom";

export const Form = () => {
    const { register, handleSubmit, reset } = useForm<NewProductForm>();
    let navigate = useNavigate();

    const onSubmit = async (data: NewProductForm) => {
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price.toString());
        formData.append("quantity", data.quantity.toString());
        formData.append("category", data.category);
        formData.append("file", data.file[0]);

        let response = await sendData<Product>("http://localhost:8080/api/product/new", formData);
        if (response.mainPhotoUrl !== "") {
            reset();
            navigate("/shop");
        }
    };

    return (
        <div
            className={"flex flex-col justify-center items-center w-full absolute bg-white px-8 pt-6 pb-8 mb-4 w-3/4"}>
            <p className={"text-xl font-semibold mb-5"}>New product form</p>
            <form onSubmit={handleSubmit(onSubmit)} className={"grid grid-cols-2 gap-5"}>

                <div>
                    <Input name={"name"} type={"text"} register={register} required />
                    <Input name={"price"} type={"number"} register={register} required />
                    <Input name={"quantity"} type={"number"} register={register} required />

                    <div className={"mb-5"}>
                        <label>Category:</label>
                        <select {...register("category")} className={"w-full"}>
                            <option value={"tshirt"}>T-shirt</option>
                            <option value={"trousers"}>Trousers</option>
                        </select>
                    </div>
                </div>

                <div>
                    <ImageUploadInput name={"file"} label={"Photo URL"} type={"file"} register={register}
                                      required
                                      inputProps={{ multiple: false, accept: "image/*" }} />
                </div>

                <div className={"flex justify-around col-span-2"}>
                    <button
                        className={"bg-orange-400 rounded w-36 h-16 m-3"}
                        type={"reset"}
                        onClick={() => navigate("/shop")}
                    >
                        CANCEL
                    </button>
                    <button className={"bg-green-300 rounded w-36 h-16 m-3"} type={"submit"}>SUBMIT</button>
                </div>
            </form>
        </div>);
};