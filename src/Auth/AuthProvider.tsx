import React, { ReactNode, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { User } from '../Models/User';
import { AS } from '../Utils/Constants';

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<PropsType> = ({children}: PropsType) => {
  const [user, setUser] = useState<User>(null);

  const Login = (user: User) => {
    setUser(user);
    AsyncStorage.setItem(AS.USER, JSON.stringify(user));
  };

  const Logout = () => {
    setUser(null);
    AsyncStorage.removeItem(AS.USER);
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
  login: (user: User) => void;
  logout: () => void;
};
