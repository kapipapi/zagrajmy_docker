import React from "react";
import ReactDOM from "react-dom/client";


import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppRouter } from "./routing/AppRouter";
import { keycloak } from "./keycloak";
import { KeycloakProvider } from "./tools/auth/KeycloakContext";
import { BrowserRouter } from "react-router-dom";
import { LoadingPage } from "./routing/LoadingPage";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <KeycloakProvider authClient={keycloak} LoadingComponent={<LoadingPage />}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </KeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
