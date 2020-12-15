import React from 'react';
import { Button, Text } from 'react-native';

import Center from '../Components/Wrapper/Center';
import { AuthStackPropType } from '../Routes/AuthStacks';
import { AUTH_STACK_ROUTES } from '../Utils/Constants';

const RegisterScreen: React.FC<
  AuthStackPropType<typeof AUTH_STACK_ROUTES.REGISTER>
> = ({navigation}: AuthStackPropType<typeof AUTH_STACK_ROUTES.REGISTER>) => {
  const onGoToLogin = () => {
    navigation.navigate(AUTH_STACK_ROUTES.LOGIN);
  };

  return (
    <Center>
      <Text>Register Screen</Text>
      <Button title="Login" onPress={onGoToLogin} />
    </Center>
  );
};

export default RegisterScreen;
