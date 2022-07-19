import React from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../../../hooks/sendData";
import { useNavigate } from "react-router-dom";
import { Game } from "./types";
import { useGetData } from "../../../hooks/useGetData";
import { Sports } from "../../../models/Sport";
import { Places } from "../../../models/Place";

export const NewGameForm = () => {
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
        <div className={"grid grid-cols-2 justify-center items-center w-full absolute bg-white px-8 pt-6 pb-8 mt-32 w-1/3 shadow-xl"}>
            <p className={"text-2xl font-semibold mb-5 col-span-1 col-start-1"}>New game form</p>

            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col col-span-1  col-start-1"}>
                <div>
                    <div className={"mb-5"}>
                        <label>Sport:</label>
                        <select {...register("sport_id")} className={"w-full"} defaultValue={0}>
                            <option value={-1} disabled={true}>SELECT SPORT</option>
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
                        <select {...register("place_id")} className={"w-full"} defaultValue={0}>
                            <option value={-1} disabled={true}>SELECT PLACE</option>
                            {places &&
                                places.map((place, index) => {
                                    return <option
                                        value={place.ID}>
                                        {place.Name} - {place.Address}
                                    </option>;
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
                        <input type={"text"} className={"w-full border p-2"} {...register("users_ids")} />
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

            <div className={"flex w-full h-full ml-4 col-span-1 col-start-2 border justify-center bg-green-400"}>MAP</div>
        </div>);
};