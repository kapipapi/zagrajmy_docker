import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { useGetData } from "../../../../hooks/useGetData";
import { Places } from "../../../../models/Place";

export const MapView = () => {
    let [map, setMap] = useState<LeafletMap | null>();
    let [position, setPosition] = useState<[number, number] | undefined>(undefined);
    const places = useGetData<Places>("http://localhost:8080/api/places/get");

    useEffect(() => {
        if (position) map?.flyTo(position, 17);
    }, [position, map]);

    return <div className={"col-span-2 h-full"}>
        <MapContainer
            center={[54.389177, 18.594233]}
            zoom={13}
            style={{ height: "100%" }}
            ref={e => setMap(e)}
            zoomControl={false}
        >
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                maxZoom={20}
            />
            {places &&
                places.map((place) => {
                    return <Marker key={place.ID} position={[place.LocationLat, place.LocationLon]}>
                        <Popup>
                            <p>{place.Name}</p>
                            <p>Sports: {place.Sports.map((s) => s.Name).join(", ")}</p>
                            <button
                                className={"bg-lime-300 p-1 rounded w-full"}
                                onClick={() => setPosition([place.LocationLat, place.LocationLon])}
                            >
                                SELECT
                            </button>
                        </Popup>
                    </Marker>;
                })}
        </MapContainer>
    </div>;
};