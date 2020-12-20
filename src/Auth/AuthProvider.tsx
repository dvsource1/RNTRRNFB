import React, { ReactNode, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { AuthUser } from '../Models/AuthUser';
import { User } from '../Models/User';
import AuthService from '../Services/AuthService';
import { ErrorHandler } from '../Services/Handlers/ErrorHandler';
import { AS } from '../Utils/Constants';

export const AuthContext = React.createContext<AuthContextType>({
  authUser: null,
  login: () => Promise.resolve(null),
  logout: () => Promise.resolve(),
});

const AuthProvider: React.FC<PropsType> = ({children}: PropsType) => {
  const [authUser, setAuthUser] = useState<AuthUser>(null);

  const Login: (authUser: AuthUser) => Promise<User> = async (
    authUser: AuthUser,
  ): Promise<User> => {
    return new AuthService()
      .Login(authUser)
      .then((authUser: AuthUser) => {
        setAuthUser(authUser);
        AsyncStorage.setItem(AS.USER, JSON.stringify(authUser));
        const {user} = authUser!;
        return Promise.resolve<User>(user);
      })
      .catch((error) => {
        ErrorHandler.HandleAuthError(error);
        return Promise.reject('USER LOGGING FAILED');
      });
  };

  const Logout: () => Promise<void> = async (): Promise<void> => {
    return new AuthService()
      .Logout()
      .then(() => {
        setAuthUser(null);
        AsyncStorage.removeItem(AS.USER);
        return Promise.resolve();
      })
      .catch((error) => {
        ErrorHandler.HandleAuthError(error);
        return Promise.reject('USER LOGOUT FAILED');
      });
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
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
  authUser: AuthUser;
  login: (authUser: AuthUser) => Promise<User>;
  logout: () => Promise<void>;
};
