import AuthenticationService from '~/services/AuthenticationService/Authentication.service';
import { useState } from 'react';
import { AuthSessionResult } from 'expo-auth-session';
import useConnectionViewModel from '~/common/viewModel/Connection/Connection.viewmodel';

const useLoginController = () => {
  const { login } = AuthenticationService();
  const [error, setError] = useState('');
  const { onAuthenticationSuccess } = useConnectionViewModel();

  const onPressLogin = () => {
    login().then(onAuthentication);
  };

  const onAuthentication = (response: AuthSessionResult) => {
    if (response.type === 'success' && response.authentication) {
      onAuthenticationSuccess(response.authentication.accessToken);
    } else {
      //if the login failed, give the user a feedback
      setError('Login fehlgeschlagen');
    }
  };

  return {
    onPressLogin,
    error,
  };
};

export default useLoginController;
