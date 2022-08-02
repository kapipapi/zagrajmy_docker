import React from "react";

export const Home = () => {
    return <div
        className={"w-full h-full bg-cover bg-center bg-[url('https://www.lm.pl/media/news_foto/136450-w-kole-oddano-do-uzytku-pelowymiarowe-boisko-ze-sztuczna-nawierzchnia_1200.jpg')]"}>
        <div
            className={"flex flex-col w-full h-full items-center justify-center bg-gradient-to-t from-green-500/30 to-blue-400/40 text-white opacity-100"}>
            <div className={"text-center w-full p-5 bg-black/20 shadow-2xl"}>
                <p className={"text-4xl font-bold"}>Zagraj z nami!</p>
            </div>
            <div
                className={"flex flex-col absolute bottom-0 text-green-900 bg-white/50 backdrop-blur-sm p-5 w-full justify-center"}>
                <p>Ciekawe rozgrywki:</p>
                <div className={"grid grid-cols-5 gap-5"}>
                    <div className={"border p-5"}>game 1</div>
                    <div className={"border p-5"}>game 2</div>
                    <div className={"border p-5"}>game 3</div>
                </div>
            </div>
        </div>
    </div>;
};