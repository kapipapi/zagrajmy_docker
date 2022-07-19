import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "../views/Layout/Layout";

import { Home } from "views/Home/Home";
import { NewGameForm } from "../views/game/NewGameFrom/NewGameForm";
import { ListGames } from "../views/game/ListGames/ListGames";

export const AppRouter = () => {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="/game/new" element={<NewGameForm />} />
                    <Route path="/game/list" element={<ListGames />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>;
};