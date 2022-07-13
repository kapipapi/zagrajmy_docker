import React, { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
import { Product } from "../../../models/Products";

type InputProps = {
    name: keyof Product;
    label?: string;
    type: HTMLInputTypeAttribute;
    register: UseFormRegister<Product>;
    required?: boolean;
}

export const Input = ({ name, label, type, register, required = false }: InputProps) => {

    const styles = {
        inputContainer: "mb-5",
        label: "block",
        input: "border rounded w-full"
    };

    function capitalizeFirstLetter(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    console.log(type == "number")

    return <div className={styles.inputContainer}>
        <label className={styles.label}>{label ? label : capitalizeFirstLetter(name)}:</label>
        <input className={styles.input} type={type} {
            ...register(
                name,
                {
                    valueAsNumber: type == "number",
                    required: required
                })
        } />
    </div>;
};