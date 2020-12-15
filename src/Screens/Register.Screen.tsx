import React from 'react';
import { Button, Text } from 'react-native';

import Center from '../Components/Wrapper/Center';
import { AuthStackPropType, AuthStackRoute } from '../Routes/AuthStacks';

const RegisterScreen: React.FC<
  AuthStackPropType<typeof AuthStackRoute.Register>
> = ({navigation}: AuthStackPropType<typeof AuthStackRoute.Register>) => {
  const onGoToLogin = () => {
    navigation.navigate(AuthStackRoute.Login);
  };

  return (
    <Center>
      <Text>Register Screen</Text>
      <Button title="Login" onPress={onGoToLogin} />
    </Center>
  );
};

export default RegisterScreen;
