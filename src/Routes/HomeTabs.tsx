import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import DashboardScreen from '../Screens/Dashboard.Screen';
import FeedScreen from '../Screens/Feed.Screen';
import ProfileScreen from '../Screens/Profile.Screen';

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs = () => {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name={HomeTabRoute.Dashboard}
        component={DashboardScreen}
      />
      <HomeTab.Screen name={HomeTabRoute.Feed} component={FeedScreen} />
      <HomeTab.Screen name={HomeTabRoute.Profile} component={ProfileScreen} />
    </HomeTab.Navigator>
  );
};

export default HomeTabs;

export type HomeTabPropType<T extends keyof HomeTabParamList> = {
  navigation: StackNavigationProp<HomeTabParamList, T>;
  route: RouteProp<HomeTabParamList, T>;
};

type HomeTabParamList = {
  Feed: undefined;
  Dashboard: undefined;
  Profile: undefined;
};

export namespace HomeTabRoute {
  export const Feed = 'Feed';
  export const Dashboard = 'Dashboard';
  export const Profile = 'Profile';
}
