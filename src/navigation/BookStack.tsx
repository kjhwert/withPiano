import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BookContainer from '../screens/Book/BookContainer';
import Menu from '../Components/Menu';
import {BookContextProvider} from '../Components/context/BookContext';

const Stack = createStackNavigator();

export default ({navigation}) => {
  return (
    <BookContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
            borderBottomColor: 'black',
            shadowColor: 'black',
          },
          headerRight: () => {
            return <Menu navigation={navigation} />;
          },
          animationEnabled: false,
          headerBackTitleVisible: false,
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="index"
          component={BookContainer}
          options={{
            headerTitle: '예약내역',
          }}
        />
      </Stack.Navigator>
    </BookContextProvider>
  );
};
