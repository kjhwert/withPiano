import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import LoginStack from './src/navigation/LoginStack';
import {UserContextProvider} from './src/Components/context/UserContext';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <UserContextProvider>
          <LoginStack />
        </UserContextProvider>
      </NavigationContainer>
    </>
  );
}
