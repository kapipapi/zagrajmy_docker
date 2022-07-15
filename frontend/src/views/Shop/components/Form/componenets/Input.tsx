import React, {
    DetailedHTMLProps,
    HTMLAttributes,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    useEffect, useState
} from "react";
import { UseFormRegister } from "react-hook-form";
import { Product, NewProductForm } from "../../../models/Products";

type InputProps = {
    name: keyof NewProductForm;
    label?: string;
    type: HTMLInputTypeAttribute;
    register: UseFormRegister<NewProductForm>;
    required?: boolean;
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

export const Input = ({ name, label, type, register, required = false, inputProps = {} }: InputProps) => {

    const styles = {
        inputContainer: "mb-5",
        label: "block text-md",
        input: "border rounded w-full p-2 text-md"
    };

    function capitalizeFirstLetter(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return <div className={styles.inputContainer}>
        <label className={styles.label}>{label ? label : capitalizeFirstLetter(name)}:</label>
        <input placeholder={label ? label : capitalizeFirstLetter(name)} {...inputProps} className={styles.input} type={type} {
            ...register(
                name,
                {
                    valueAsNumber: type === "number",
                    required: required
                })
        } />
    </div>;
};

export const ImageUploadInput = ({ name, label, type, register, required = false }: InputProps) => {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl: any = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    const styles = {
        inputContainer: "mb-5 h-full",
        label: "block",
        input: "border rounded w-full mb-3"
    };

    function capitalizeFirstLetter(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return <div className={styles.inputContainer}>
        <label className={styles.label}>{label ? label : capitalizeFirstLetter(name)}:</label>
        <input className={styles.input} type={type} {
            ...register(
                name,
                {
                    required: required,
                    onChange: onSelectFile
                })
        } />
        {selectedFile ?
            <div className={"w-96 border overflow-y-scroll"}>
                <img alt={"preview"} src={preview} />
            </div>
            :
            <div className={"flex h-3/4 border items-center justify-center"}>
                <p>PHOTO PREVIEW</p>
            </div>
        }
    </div>;
};