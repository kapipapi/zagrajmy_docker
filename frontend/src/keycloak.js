import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    realm: 'zagrajmy',
    url: `${window.location.origin}/auth/`,
    clientId: 'react-client',
});