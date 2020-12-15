import React from 'react';
import { Button, Text } from 'react-native';

import Center from '../Components/Wrapper/Center';
import { AuthStackPropType } from '../Routes/AuthStacks';
import { AUTH_STACK_ROUTES } from '../Utils/Constants';

const IntroScreen: React.FC<
  AuthStackPropType<typeof AUTH_STACK_ROUTES.INTRO>
> = ({navigation}: AuthStackPropType<typeof AUTH_STACK_ROUTES.INTRO>) => {
  const onGoToLogin = () => {
    console.log('GO TO LOGIN');
    navigation.navigate(AUTH_STACK_ROUTES.LOGIN);
  };

  return (
    <Center>
      <Text>Intro Screen</Text>
      <Button title="Go To Login" onPress={onGoToLogin} />
    </Center>
  );
};

export default IntroScreen;
