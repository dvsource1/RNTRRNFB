import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text } from 'react-native';

import { AuthMethod } from '../Auth/Auth';
import { AuthContext, AuthContextType } from '../Auth/AuthProvider';
import Center from '../Components/Wrapper/Center';
import { AuthUser } from '../Models/AuthUser';
import { AuthStackPropType } from '../Routes/AuthStacks';
import { AUTH_STACK_ROUTES } from '../Utils/Constants';

const LoginScreen: React.FC<
  AuthStackPropType<typeof AUTH_STACK_ROUTES.LOGIN>
> = ({navigation}: AuthStackPropType<typeof AUTH_STACK_ROUTES.LOGIN>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {login} = useContext<AuthContextType>(AuthContext);

  const onLoginWithEmailAndPassword = async () => {
    setLoading(true);
    const authUser: AuthUser = {
      user: {
        email: 'mytest.mail@gmail.com',
        credential: {
          password: 'admin123',
        },
      },
      authMethod: AuthMethod.FB_EMAIL_PASSWORD,
    };
    await login(authUser);
  };

  const onLoginWithGoogle = async () => {
    setLoading(true);
    const authUser: AuthUser = {
      user: null,
      authMethod: AuthMethod.FB_GOOGLE,
    };
    await login(authUser);
  };

  const onGoToRegister = () => {
    navigation.navigate(AUTH_STACK_ROUTES.REGISTER);
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return loading ? (
    <Center>
      <ActivityIndicator size="large" color="#ff0000" />
    </Center>
  ) : (
    <Center>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={onLoginWithEmailAndPassword} />
      <Button title="Login with Google" onPress={onLoginWithGoogle} />
      <Button title="Register" onPress={onGoToRegister} />
    </Center>
  );
};

export default LoginScreen;
