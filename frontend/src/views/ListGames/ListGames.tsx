import React from "react";
import { useGetData } from "../../hooks/useGetData";
import { Games } from "../../models/Game";
import { Sports } from "../../models/Sport";
import { Places } from "../../models/Place";

export const ListGames = () => {
    const games = useGetData<Games>("http://localhost:8080/api/games/get");
    const sports = useGetData<Sports>("http://localhost:8080/api/sports/get");
    const places = useGetData<Places>("http://localhost:8080/api/places/get");

    return <div className={"grid grid-cols-3 w-1/2"}>
        <div className={"flex flex-col col-span-1 col-start-1 border m-4"}>
            <p className={"text-xl font-semibold"}>Filters</p>
            <div>
                <input type={"checkbox"} />
                <label>OPTION 1</label>
            </div>
            <div>
                <input type={"checkbox"} />
                <label>OPTION 2</label>
            </div>
            <div>
                <input type={"checkbox"} />
                <label>OPTION 3</label>
            </div>
        </div>

        <div className={"flex flex-col col-span-2 col-start-2 space-y-5 pt-4 "}>
            {games &&
                games.map((game) => {
                    return <div className={"border rounded p-4"} key={game.ID}>
                        <p>Game ID: {game.ID}</p>
                        <p>Sport: {sports?.filter((s) => s.ID === game.SportID)[0].Name ?? ""}</p>
                        <p>Place: {places?.filter((p) => p.ID === game.PlaceID)[0].Name ?? ""}</p>
                        <p>Players: {game.Users.map((p) => p.Name).join(", ")}</p>
                    </div>;
                })
            }
        </div>
    </div>;
};

