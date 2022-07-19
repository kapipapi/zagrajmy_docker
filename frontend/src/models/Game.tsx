import { User } from "./User";

export type Game = {
    ID: number;
    CreatedAt: Date;
    StartDatetime: Date;
    SportID: number;
    PlaceID: number;
    Users: User[];
}

export type Games = Game[];