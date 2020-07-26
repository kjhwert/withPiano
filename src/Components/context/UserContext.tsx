import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {IUser} from '../types/User';

const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
  const defaultUser = {
    token: '',
    user: {
      id: 0,
      email: '',
      name: '',
    },
  };

  const [user, setUser] = useState<IUser>(defaultUser);
  const [loading, setLoading] = useState(true);

  const saveUser = async (val: IUser) => {
    await AsyncStorage.setItem('@user', JSON.stringify(val));
    setUser(val);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@user');
    setUser(defaultUser);
  };

  const changeLoading = () => {
    setLoading(!loading);
  };

  const getUser = async () => {
    setLoading(true);
    const result = await AsyncStorage.getItem('@user');
    let user = defaultUser;
    if (result) {
      user = JSON.parse(result);
    }
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{user, saveUser, loading, changeLoading, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
