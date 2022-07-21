import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    realm: 'master',
    url: `${window.location.origin}:28080`,
    clientId: 'react-client',
});