import React, { ReactNode, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { User } from '../Models/User';
import { AS } from '../Utils/Constants';
import { AuthMethod } from './Auth';
import AuthService from './AuthService';

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => Promise.resolve(null),
  logout: () => Promise.resolve(),
});

const AuthProvider: React.FC<PropsType> = ({children}: PropsType) => {
  const [user, setUser] = useState<User>(null);

  const Login: (user: User, authMethod: AuthMethod) => Promise<User> = async (
    user: User,
    authMethod: AuthMethod,
  ) => {
    return new AuthService()
      .Login(user, authMethod)
      .then((data) => {
        setUser(user);
        AsyncStorage.setItem(AS.USER, JSON.stringify(user));
        return Promise.resolve<User>(user);
      })
      .catch((error) => {
        return Promise.reject('USER LOGGING FAILED');
      });
  };

  const Logout: () => Promise<void> = async () => {
    return new AuthService()
      .Logout()
      .then(() => {
        setUser(null);
        AsyncStorage.removeItem(AS.USER);
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject('USER LOGOUT FAILED');
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: Login,
        logout: Logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

type PropsType = {
  children: ReactNode;
};

export type AuthContextType = {
  user: User;
  login: (user: User, authMethod: AuthMethod) => Promise<User>;
  logout: () => Promise<void>;
};
