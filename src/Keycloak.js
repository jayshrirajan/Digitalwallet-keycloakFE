/* eslint-disable no-undef */
import Keycloak from 'keycloak-js';
const keycloak =new Keycloak({
  url: process.env.REACT_APP_keycloakURL,
  realm: process.env.REACT_APP_realm,
  clientId: process.env.REACT_APP_clientID,
})

export default keycloak;