import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

type Category = "all" | "tshirt" | "trousers";

export type SideMenuForm = {
    category?: Category;
}

type SideMenuProps = {
    setForm: Dispatch<SetStateAction<SideMenuForm | undefined>>;
}

export const SideMenu = ({ setForm }: SideMenuProps) => {
    const styles = {
        inputContainer: "m-1",
        input: "mr-2",
        label: "text-md"
    };

    const { register, control } = useForm<SideMenuForm>();
    let formState = useWatch<SideMenuForm>({ control });

    useEffect(() => {
        setForm(formState);
    }, [setForm, formState]);

    return <div className={"fixed"}>
        <p className={"underline"}>Filters</p>
        <form className={"flex flex-col"}>
            <p className={"font-bold text-xl"}>CATEGORY</p>
            <div className={styles.inputContainer}>
                <input type={"radio"} id={"all"} value={undefined} className={styles.input} {...register("category")}
                       defaultChecked={true} />
                <label htmlFor={"all"} className={styles.label}>All</label>
            </div>
            <div className={styles.inputContainer}>
                <input type={"radio"} id={"tshits"} value={"tshirt"}
                       className={styles.input} {...register("category")} />
                <label htmlFor={"tshits"} className={styles.label}>T-shirts</label>
            </div>
            <div className={styles.inputContainer}>
                <input type={"radio"} id={"trousers"} value={"trousers"}
                       className={styles.input} {...register("category")} />
                <label htmlFor={"trousers"} className={styles.label}>Trousers</label>
            </div>
        </form>
    </div>;
};