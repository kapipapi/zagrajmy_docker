import React, { useState } from "react";
import { useGetData } from "../../../../tools/hooks/useGetData";
import { Game, Games } from "../../../../models/Game";
import { Sports } from "../../../../models/Sport";
import { Places } from "../../../../models/Place";
import { basketball, football, tennisball } from "../../../../assets/sports_icons";

export const SideList = () => {
    const games = useGetData<Games>("http://localhost:8080/api/games/get");
    const sports = useGetData<Sports>("http://localhost:8080/api/sports/get");
    const places = useGetData<Places>("http://localhost:8080/api/places/get");

    const [selected, setSelected] = useState<number | undefined>(undefined);

    return <div className={"flex flex-col h-full border-r-2 col-span-1"}>
        <div className={"flex justify-center items-center p-2 space-x-8"}>
            <div>
                <span>Sport:</span>
                <select className={"ml-2 p-2 rounded-md bg-slate-100"}>
                    <option>all</option>
                    <option>basketball</option>
                    <option>football</option>
                    <option>tennis</option>
                </select>
            </div>
            <div>
                <span>Date:</span>
                <input className={"ml-2 p-2 rounded-md bg-slate-100"} type={"date"} />
            </div>
        </div>
        {games &&
            games.map((game) => (
                <button
                    onClick={() => setSelected((state) => state !== game.ID ? game.ID : undefined)}
                    className={"text-left"}
                >
                    <GameItem
                        key={game.ID}
                        game={game}
                        sports={sports ?? []}
                        places={places ?? []}
                        open={selected === game.ID}
                    />
                </button>
            ))
        }
    </div>;
};

type GameItemProps = {
    game: Game,
    sports: Sports,
    places: Places,
    open: boolean
}

const GameItem = ({ game, sports, places, open }: GameItemProps) => {
    return (
        <div className={"rounded-[2rem] mx-5 my-2.5 p-2 bg-slate-100 "}>
            <div className={"flex h-12 items-center"}>
                <GameItemIcon sport={game.SportID} />
                <p className={"ml-5"}>{sports.filter((s) => s.ID === game.SportID)[0]?.Name ?? ""}</p>
            </div>
            <div className={`transition-height duration-500 overflow-hidden ${!open ? "h-0" : "h-20"}`}>
                <div className={"p-2"}>
                    <p><b>Place</b>: {places.filter((p) => p.ID === game.PlaceID)[0]?.Name ?? ""}</p>
                    <p><b>Players</b>: {game.Users.map((p) => p.Name).join(", ")}</p>
                </div>
            </div>
        </div>
    );
};

const GameItemIcon = ({ sport }: { sport: number }) => {
    switch (sport) {
        case 1:
            return <img src={basketball()} alt={"basketball icon"} className={"h-full rounded-full"} />;
        case 2:
            return <img src={football()} alt={"basketball icon"} className={"h-full rounded-full"} />;
        case 3:
            return <img src={tennisball()} alt={"basketball icon"} className={"h-full rounded-full"} />;
        default:
            return <></>;
    }
};