import React, { useState } from "react";
import { useGetData } from "../../../../hooks/useGetData";
import { Game, Games } from "../../../../models/Game";
import { Sports } from "../../../../models/Sport";
import { Places } from "../../../../models/Place";
import { basketball } from "../../../../assets/sports_icons";
import { arrowdown } from "../../../../assets/navigation";

export const SideList = () => {
    const games = useGetData<Games>("http://localhost:8080/api/games/get");
    const sports = useGetData<Sports>("http://localhost:8080/api/sports/get");
    const places = useGetData<Places>("http://localhost:8080/api/places/get");

    const [selected, setSelected] = useState<number | undefined>(undefined);

    return <div className={"flex flex-col h-full border-r-2 col-span-1"}>
        <div className={"flex justify-center items-center p-2"}>
            <button>
                <div
                    className={"flex rounded-full shadow-md py-3 px-6 text-xl justify-center items-center border active:shadow-sm"}
                >
                    games
                    <img src={arrowdown()} alt={"arrowdown"} className={"ml-3 w-3"} />
                </div>
            </button>
        </div>
        {games &&
            games.map((game) => (
                <button
                    onClick={() => setSelected((state) => state === undefined ? game.ID : undefined)}
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
        <div className={"rounded-[2rem] m-5 p-2 bg-slate-100 "}>
            <div className={"flex h-12 items-center"}>
                <GameItemIcon />
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

const GameItemIcon = () => {
    return <img src={basketball()} alt={"basketball icon"} className={"h-full rounded-full"} />;
};