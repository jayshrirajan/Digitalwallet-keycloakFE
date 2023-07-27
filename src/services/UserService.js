import _kc from '../Keycloak';

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc
    .init({
      onLoad: 'check-sso',

      pkceMethod: 'S256',
    })
    .then((authenticated) => {
      if (!authenticated) {
        // eslint-disable-next-line no-console
        console.log('user is not authenticated..!');
      } else {
        // eslint-disable-next-line no-console
        console.log('authenticated');
      }
      onAuthenticatedCallback();
    })
    // eslint-disable-next-line no-console
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

localStorage.setItem('token1', getToken);

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc?.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
};

export default UserService;
