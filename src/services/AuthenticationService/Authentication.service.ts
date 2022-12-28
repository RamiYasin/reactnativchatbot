import * as AuthSession from 'expo-auth-session';
import { AUTH0_AUDIENCE, AUTH0_DOMAIN, AUTH0_ID } from '@env';
import { Platform } from 'react-native';
import { AuthSessionOptions } from 'expo-auth-session/src/AuthSession.types';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const authorizationEndpoint = `${AUTH0_DOMAIN}` + '/authorize';
const logoutEndpoint = `${AUTH0_DOMAIN}` + '/v2/logout?';

const AuthenticationService = () => {
  const [, , promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: AUTH0_ID,
      responseType: 'token',
      scopes: ['openid', 'profile'],
      extraParams: {
        audience: AUTH0_AUDIENCE,
      },
    },
    { authorizationEndpoint },
  );

  const login = (): Promise<AuthSession.AuthSessionResult> => {
    return promptAsync({ useProxy });
  };

  const logout = (): Promise<AuthSession.AuthSessionResult> => {
    const authOptions: AuthSessionOptions = {
      authUrl: `${logoutEndpoint}client_id=${AUTH0_ID}`,
    };

    return AuthSession.startAsync(authOptions);
  };

  return {
    login,
    logout,
  };
};

export default AuthenticationService;
