import React, { useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext, AuthContextType } from '../Auth/AuthProvider';
import SplashScreen from '../Screens/Splash.Screen';
import { ErrorHandler } from '../Services/Handlers/ErrorHandler';
import { AuthUserManager } from '../Services/Managers/AuthUserManager';
import { UserManager } from '../Services/Managers/UserManager';
import { AS } from '../Utils/Constants';
import RootStacks from './AuthStacks';
import HomeTabs from './HomeTabs';

const RootRoutes: React.FC<{}> = () => {
  const {authUser, login} = useContext<AuthContextType>(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem(AS.USER)
      .then((currentUser: string | null) => {
        if (currentUser) {
          login(AuthUserManager.GetAuthUser(currentUser));
        }
        setLoading(false);
      })
      .catch(ErrorHandler.HandleAuthError);
    setLoading(false);
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
