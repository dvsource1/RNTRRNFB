import React from 'react';
import { Button, Text } from 'react-native';

import Center from '../Components/Wrapper/Center';
import { AuthStackPropType, AuthStackRoute } from '../Routes/AuthStacks';

function IntroScreen({
  navigation,
}: AuthStackPropType<typeof AuthStackRoute.Intro>) {
  const onButtonPressed = () => {
    navigation.navigate(AuthStackRoute.Login);
  };

  return (
    <Center>
      <Text>Intro Screen</Text>
      <Button title="Login" onPress={onButtonPressed} />
    </Center>
  );
}

export default IntroScreen;
