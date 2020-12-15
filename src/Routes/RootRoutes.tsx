import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { User } from '../Models/User';
import SplashScreen from '../Screens/Splash.Screen';
import RootStacks from './AuthStacks';
import HomeTabs from './HomeTabs';

const RootRoutes: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    setLoading(false);
    // setUser({username: 'dv'});
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
