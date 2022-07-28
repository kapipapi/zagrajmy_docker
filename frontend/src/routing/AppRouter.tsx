import React from "react";
import { useRoutes } from "react-router-dom";
import { useKeycloak } from "../tools/auth/KeycloakContext";
import routes from "./routes";

export const AppRouter = () => {
    const { keycloak } = useKeycloak();

    const router = useRoutes(routes(keycloak.authenticated ?? false));

    return (
        <div>
            <React.StrictMode>
                {router}
            </React.StrictMode>
        </div>);
};