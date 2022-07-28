import { Navigate, RouteObject } from "react-router-dom";
import { Home } from "views/Home/Home";
import { Layout } from "../views/Layout/Layout";
import { NewGameForm } from "../views/NewGameFrom/NewGameForm";
import React from "react";
import { GameSearch } from "../views/GameSearch/GameSearch";

const routes = (authenticated: boolean): RouteObject[] => [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/search",
                element: authenticated ? <GameSearch /> : <Navigate to={"/"} />
            },
            {
                path: "/game/new",
                element: <NewGameForm />
            }
        ]
    }
];

export default routes;