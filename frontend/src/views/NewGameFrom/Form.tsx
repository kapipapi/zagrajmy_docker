import React from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../../hooks/sendData";
import { useNavigate } from "react-router-dom";
import { Game } from "./types";
import { useGetData } from "../../hooks/useGetData";
import { Sports } from "../../models/Sport";
import { Places } from "../../models/Place";
import { Users } from "../../models/User";

export const Form = () => {
    const { register, handleSubmit, reset } = useForm<Game>();
    let navigate = useNavigate();

    const sports = useGetData<Sports>("http://localhost:8080/api/sports/get");
    const places = useGetData<Places>("http://localhost:8080/api/places/get");

    const onSubmit = async (data: Game) => {
        console.log(data);
        let response = await sendData<{ ok: boolean }>("http://localhost:8080/api/games/new", JSON.stringify(data), { "Content-Type": "application/json" });
        if (response.ok) {
            reset();
            navigate("/");
        }
    };

    return (
        <div
            className={"flex flex-col justify-center items-center w-full absolute bg-white px-8 pt-6 pb-8 mb-4 w-3/4"}>
            <p className={"text-xl font-semibold mb-5"}>New game form</p>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>

                <div>
                    <div className={"mb-5"}>
                        <label>Sport:</label>
                        <select {...register("sport_id")} className={"w-full"}>
                            {sports &&
                                sports.map((sport) => {
                                    return <option value={sport.ID}>{sport.Name}</option>;
                                })}
                        </select>
                    </div>
                </div>

                <div>
                    <div className={"mb-5"}>
                        <label>Place:</label>
                        <select {...register("place_id")} className={"w-full"}>
                            {places &&
                                places.map((place) => {
                                    return <option value={place.ID}>{place.Name} - {place.Address}</option>;
                                })}
                        </select>
                    </div>
                </div>

                <div>
                    <div className={"mb-5"}>
                        <label>Datetime:</label>
                        <input {...register("start_datetime")} className={"w-full"} type={"datetime-local"} />
                    </div>
                </div>

                <div>
                    <div className={"mb-5"}>
                        <label>Players:</label>
                        <input type={"text"} className={"w-full"} {...register("users_ids")}/>
                    </div>
                </div>

                <div className={"flex justify-around col-span-2"}>
                    <button
                        className={"bg-orange-400 rounded w-36 h-16 m-3"}
                        type={"reset"}
                        onClick={() => navigate("/")}
                    >
                        CANCEL
                    </button>
                    <button className={"bg-green-300 rounded w-36 h-16 m-3"} type={"submit"}>SUBMIT</button>
                </div>
            </form>
        </div>);
};