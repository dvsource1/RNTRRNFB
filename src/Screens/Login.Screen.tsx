import React from 'react';
import { Button, Text } from 'react-native';

import Center from '../Components/Wrapper/Center';
import { AuthStackPropType, AuthStackRoute } from '../Routes/AuthStacks';

function LoginScreen({
  navigation,
}: AuthStackPropType<typeof AuthStackRoute.Login>) {
  const onLogin = () => {
    navigation.navigate(AuthStackRoute.Home);
  };

  const onGoToRegister = () => {
    navigation.navigate(AuthStackRoute.Register);
  };

  return (
    <Center>
      <Text>Login Screen</Text>
      <Button title="Home" onPress={onLogin} />
      <Button title="Register" onPress={onGoToRegister} />
    </Center>
  );
}

export default LoginScreen;
