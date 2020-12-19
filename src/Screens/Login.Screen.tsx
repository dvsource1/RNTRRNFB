import React, { useContext } from 'react';
import { Button, Text } from 'react-native';

import { AuthMethod } from '../Auth/Auth';
import { AuthContext, AuthContextType } from '../Auth/AuthProvider';
import Center from '../Components/Wrapper/Center';
import { User } from '../Models/User';
import { AuthStackPropType } from '../Routes/AuthStacks';
import { AUTH_STACK_ROUTES } from '../Utils/Constants';

const LoginScreen: React.FC<
  AuthStackPropType<typeof AUTH_STACK_ROUTES.LOGIN>
> = ({navigation}: AuthStackPropType<typeof AUTH_STACK_ROUTES.LOGIN>) => {
  const {login} = useContext<AuthContextType>(AuthContext);

  const onLogin = async () => {
    const loggedUser: User = {
      username: 'dv',
      email: 'mytest.mail@gmail.com',
      password: 'admin123',
    };
    await login(loggedUser, AuthMethod.FB_EMAIL_PASSWORD);
  };

  const onGoToRegister = () => {
    navigation.navigate(AUTH_STACK_ROUTES.REGISTER);
  };

  return (
    <Center>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={onLogin} />
      <Button title="Register" onPress={onGoToRegister} />
    </Center>
  );
};

export default LoginScreen;
