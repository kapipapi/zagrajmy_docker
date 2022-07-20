import React from "react";
import { SideList } from "./components/SideList";
import { MapView } from "./components/MapView";

export const GameSearch = () => {
    return <div className={"grid grid-cols-3 w-full h"}>
        <SideList />
        <MapView />
    </div>;
};