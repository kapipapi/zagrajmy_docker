import {Sports} from "./Sport";

export type Place = {
    ID: number;
    Name: string;
    Address: string;
    Sports: Sports;
    LocationLat: number;
    LocationLon: number;
}

export type Places = Place[];