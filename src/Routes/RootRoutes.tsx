import React, { useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import { AuthMethod } from '../Auth/Auth';
import { AuthContext, AuthContextType } from '../Auth/AuthProvider';
import SplashScreen from '../Screens/Splash.Screen';
import { AS } from '../Utils/Constants';
import RootStacks from './AuthStacks';
import HomeTabs from './HomeTabs';

const RootRoutes: React.FC<{}> = () => {
  const {user, login} = useContext<AuthContextType>(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem(AS.USER)
      .then((currentUser: string | null) => {
        if (currentUser) {
          login(JSON.parse(currentUser), AuthMethod.FB_EMAIL_PASSWORD);
        }
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        {user ? <HomeTabs /> : <RootStacks />}
      </NavigationContainer>
    );
  }
};

export default RootRoutes;
