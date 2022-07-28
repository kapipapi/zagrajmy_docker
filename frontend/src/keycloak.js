import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    realm: 'zagrajmy',
    url: 'http://localhost:28080/auth',
    clientId: 'react-client',
});