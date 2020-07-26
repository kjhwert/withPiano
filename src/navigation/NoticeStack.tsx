import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NoticeMainContainer from '../screens/Notice/NoticeMainContainer';
import {StyleSheet} from 'react-native';
import Menu from '../Components/Menu';

const Stack = createStackNavigator();

export default ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          borderBottomColor: 'black',
          shadowColor: 'black',
        },
        headerTintColor: 'white',
        animationEnabled: false,
        headerBackTitleVisible: false,
        headerRight: () => {
          return <Menu navigation={navigation} />;
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '알림',
        }}
        component={NoticeMainContainer}
      />
    </Stack.Navigator>
  );
};
