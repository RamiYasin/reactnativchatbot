import * as AuthSession from 'expo-auth-session';
import { AUTH0_DOMAIN, AUTH0_ID } from '@env';
import useConnectionViewModel from '~/common/viewModel/Connection/Connection.viewmodel';
import { AuthSessionResult } from 'expo-auth-session';
import { AuthSessionOptions } from 'expo-auth-session/src/AuthSession.types';
import { CommonActions, useNavigation } from '@react-navigation/native';

const authorizationEndpoint = `${AUTH0_DOMAIN}` + '/v2/logout?';

const MenueController = () => {
  const { onLogoutSuccess, user, chatbotKey } = useConnectionViewModel();
  const navigation = useNavigation();
  const BackToMeneue = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'HomeScreen',
      }),
    );
  };
  const redirectLoginScreen = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'LoginScreen',
      }),
    );
  };
  const onPressLogout = () => {
    const authOptions: AuthSessionOptions = {
      authUrl: `${authorizationEndpoint}client_id=${AUTH0_ID}`,
    };

    AuthSession.startAsync(authOptions)
      .then(_onLogoutSuccess)
      .catch(onLogoutError);
  };

  const _onLogoutSuccess = ({ type }: AuthSessionResult) => {
    if (type === 'success') {
      onLogoutSuccess();
      redirectLoginScreen();
    }
  };

  const onLogoutError = (error: Error) => {
    console.error(
      'Something during the logout process goes wrong:\n' + error.message,
    );
    // TODO return a proper user feedback
  };

  return {
    onPressLogout,
    BackToMeneue,
    user,
    chatbotKey,
  };
};

export default MenueController;
