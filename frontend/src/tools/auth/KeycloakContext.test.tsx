import { noop, isEqual } from "lodash";
import React, { FC } from "react";
import Keycloak from "keycloak-js";
import { SnackbarProvider } from "notistack";
import { render, act } from "@testing-library/react";
import { KeycloakProvider, useKeycloak } from "./KeycloakContext";

const createKeycloakStub = () => {
    return Keycloak({
        realm: "awos-dev-realm",
        url: `${window.location.origin}/auth/`,
        clientId: "react-client"
    });
};

// eslint-disable-next-line
const mockInit: any = () => new Promise(noop);
const MockChild: FC<{ render: () => JSX.Element }> = ({ render: renderProp }) => {
    return renderProp();
};

describe("KeycloakContext", () => {
    it("KeycloakProvider", async () => {
        const mockKeycloak = createKeycloakStub();
        const keycloakUpdateTokenSpy = jest
            .spyOn(mockKeycloak, "init")
            .mockImplementation(mockInit);

        render(
            <SnackbarProvider>
                <KeycloakProvider
                    authClient={mockKeycloak}
                    LoadingComponent={<>Loading...</>}
                >
                    <MockChild render={() => {
                        return <div>child</div>;
                    }} />
                </KeycloakProvider>
            </SnackbarProvider>
        );

        expect(keycloakUpdateTokenSpy).toHaveBeenCalledTimes(1);
        expect(keycloakUpdateTokenSpy).toHaveBeenCalledWith({
            onLoad: "login-required"
        });
        expect(document.body).toHaveTextContent("Loading Airotec AWOS");

        act(() => {
            if (mockKeycloak.onAuthRefreshSuccess) {
                mockKeycloak.onAuthRefreshSuccess();
            }
        });

        expect(document.body).toHaveTextContent("child");
    });

    it("useKeyclok", async () => {
        const mockKeycloak = createKeycloakStub();
        let contextKeycloak: Keycloak.KeycloakInstance | null = null;
        let contextInitialized: boolean | null = null;

        render(
            <SnackbarProvider>
                <KeycloakProvider
                    authClient={mockKeycloak}
                    LoadingComponent={<>Loading...</>}
                >
                    <MockChild render={() => {
                        const { keycloak, initialized } = useKeycloak();
                        contextInitialized = initialized;
                        contextKeycloak = keycloak;

                        return <div>child</div>;
                    }} />
                </KeycloakProvider>
            </SnackbarProvider>
        );

        act(() => {
            if (mockKeycloak.onAuthRefreshSuccess) {
                mockKeycloak.onAuthRefreshSuccess();
            }
        });

        expect(isEqual(contextKeycloak, mockKeycloak)).toBeTruthy();
        expect(contextInitialized).toBeTruthy();
        expect(document.body).toHaveTextContent("child");
    });
});