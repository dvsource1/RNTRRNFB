import React, { useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext, AuthContextType } from '../Auth/AuthProvider';
import { User } from '../Models/User';
import SplashScreen from '../Screens/Splash.Screen';
import { ErrorHandler } from '../Services/Handlers/ErrorHandler';
import { AuthUserManager } from '../Services/Managers/AuthUserManager';
import { AS } from '../Utils/Constants';
import RootStacks from './AuthStacks';
import HomeTabs from './HomeTabs';

const RootRoutes: React.FC<{}> = () => {
  const {authUser, login} = useContext<AuthContextType>(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem(AS.USER)
      .then((userString: string | null) => {
        if (userString) {
          login(AuthUserManager.GetAuthUser(userString))
            .then((user: User) => {
              setLoading(false);
            })
            .catch((error) => {
              ErrorHandler.HandleAuthError(error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        ErrorHandler.HandleAuthError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        {authUser ? <HomeTabs /> : <RootStacks />}
      </NavigationContainer>
    );
  }
};

export default RootRoutes;
