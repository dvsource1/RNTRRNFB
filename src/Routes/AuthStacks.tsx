import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import HomeScreen from '../Screens/Home.Screen';
import IntroScreen from '../Screens/Intro.Screen';
import LoginScreen from '../Screens/Login.Screen';
import RegisterScreen from '../Screens/Register.Screen';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStacks = () => {
  return (
    <AuthStack.Navigator screenOptions={{header: () => null}}>
      <AuthStack.Screen name={AuthStackRoute.Intro} component={IntroScreen} />
      <AuthStack.Screen name={AuthStackRoute.Login} component={LoginScreen} />
      <AuthStack.Screen
        name={AuthStackRoute.Register}
        component={RegisterScreen}
      />
      <AuthStack.Screen name={AuthStackRoute.Home} component={HomeScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStacks;

export type AuthStackPropType<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};

type AuthStackParamList = {
  Intro: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export namespace AuthStackRoute {
  export const Intro = 'Intro';
  export const Login = 'Login';
  export const Register = 'Register';
  export const Home = 'Home';
}
