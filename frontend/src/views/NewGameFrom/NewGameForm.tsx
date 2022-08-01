import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../../tools/hooks/sendData";
import { useNavigate } from "react-router-dom";
import { Game } from "./types";
import { useGetData } from "../../tools/hooks/useGetData";
import { Sports } from "../../models/Sport";
import { Places } from "../../models/Place";
import { Map as LeafletMap } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export const NewGameForm = () => {
    const { register, handleSubmit, reset, setValue, watch } = useForm<Game>();
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

    let [map, setMap] = useState<LeafletMap | null>();
    const watchPlaceID = watch("place_id");

    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        const loc = places?.filter(p => p.ID == watchPlaceID)[0];
        if (loc) map?.flyTo([loc.LocationLat, loc.LocationLon], 17);
    }, [map, places, watchPlaceID]);

    return (
        <div
            className={"grid grid-cols-1 sm:grid-cols-2 sm:gap-2 md:gap-5 justify-center items-center bg-white mx-1 md:px-8 sm:pb-8 xl:mt-10 md:shadow-xl"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col col-span-1 col-start-1 space-y-2.5"}>
                <p className={"sm:text-2xl font-semibold col-span-2 col-start-1"}>New game</p>
                <div>
                    <label>Sport:</label>
                    <select {...register("sport_id", { required: true })} className={"w-full p-2"} defaultValue={"-1"}>
                        <option value="-1" disabled>SELECT SPORT</option>
                        {sports &&
                            sports.map((sport) => {
                                return <option key={sport.ID} value={sport.ID}>{sport.Name}</option>;
                            })}
                    </select>
                </div>

                <div>
                    <label>Place:</label>
                    <select {...register("place_id", { required: true })} className={"w-full p-2"} defaultValue={"-1"}>
                        <option value="-1" disabled>SELECT PLACE</option>
                        {places &&
                            places.map((place) => {
                                return <option
                                    key={place.ID}
                                    value={place.ID}>
                                    {place.Name} - {place.Address}
                                </option>;
                            })}
                    </select>
                </div>

                <div>
                    <label>Datetime:</label>
                    <input {...register("start_datetime", { required: true })}
                           className={"w-full border p-2 rounded"}
                           type={"datetime-local"} />
                </div>

                <div>
                    <label>Players:</label>
                    <input type={"text"} className={"w-full border p-2 rounded"} {...register("users_ids")} />
                </div>

                <div className={"flex justify-around col-span-2"}>
                    <button
                        className={"bg-orange-400 rounded w-36 sm:h-16 m-1 md:m-3"}
                        type={"reset"}
                        onClick={() => navigate("/")}
                    >
                        CANCEL
                    </button>
                    <button className={"bg-green-300 rounded w-36 sm:h-16 m-1 md:m-3"} type={"submit"}>SUBMIT</button>
                </div>
            </form>

            <div className={"h-64 sm:h-full sm:col-span-1 sm:col-start-2 justify-center bg-green-400"}>
                <MapContainer
                    center={[54.389177, 18.594233]}
                    zoom={13}
                    style={{ height: "100%" }}
                    ref={e => setMap(e)}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {places &&
                        places.map((place) => {
                            return <Marker key={place.ID} position={[place.LocationLat, place.LocationLon]}>
                                <Popup>
                                    <p>{place.Name}</p>
                                    <p>Sports: {place.Sports.map((s) => s.Name).join(", ")}</p>
                                    <button className={"bg-lime-300 p-1 rounded w-full"}
                                            onClick={() => setValue("place_id", place.ID)}>SELECT
                                    </button>
                                </Popup>
                            </Marker>;
                        })}
                </MapContainer>
            </div>
        </div>);
};