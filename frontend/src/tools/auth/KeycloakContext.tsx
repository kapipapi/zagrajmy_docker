import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    FC,
} from 'react';
import Keycloak from "keycloak-js";

interface KeycloakContextT {
    initialized: boolean;
    authHeader: {
        Authorization: string;
    };
    keycloak: Keycloak.KeycloakInstance;
}

const KeycloakContext = createContext<KeycloakContextT>({
    initialized: false,
    authHeader: { Authorization: '' },
    keycloak: {} as Keycloak.KeycloakInstance,
});

type KeycloakProviderT = {
    LoadingComponent: JSX.Element;
    authClient: Keycloak.KeycloakInstance;
    children: JSX.Element | JSX.Element[];
};

const isUserAuthenticated = (authClient: Keycloak.KeycloakInstance) =>
    !!authClient.idToken && !!authClient.token;

export const KeycloakProvider: FC<KeycloakProviderT> = ({
    children,
    authClient,
    LoadingComponent,
}) => {
    const [authState, setAuthState] = useState({
        initialized: false,
        isAuthenticated: false,
    });

    const updateAuthState = useCallback(() => {
        setAuthState({
            initialized: true,
            isAuthenticated: isUserAuthenticated(authClient),
        });
    }, [authClient]);

    const refreshToken = useCallback(
        () => authClient.updateToken(5),
        [authClient]
    );

    useEffect(() => {
        authClient.onTokenExpired = refreshToken;
        authClient.onAuthLogout = updateAuthState;
        authClient.onAuthRefreshSuccess = updateAuthState;

        authClient.init({}).then(updateAuthState);
        // eslint-disable-next-line
    }, []);

    const { initialized } = authState;

    if (!initialized) {
        return LoadingComponent;
    }

    const authHeader = {
        Authorization: authClient.token ? `Bearer ${authClient.token}` : '',
    };

    return (
        <KeycloakContext.Provider
            value={{ keycloak: authClient, initialized, authHeader }}
        >
            {children}
        </KeycloakContext.Provider>
    );
};

export const useKeycloak = (): KeycloakContextT => useContext(KeycloakContext);
