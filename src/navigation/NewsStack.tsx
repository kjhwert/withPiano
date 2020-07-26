import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet} from 'react-native';
import NewsMainContainer from '../screens/News/NewsMainContainer';
import NewsBranchMainContainer from '../screens/News/NewsBranchMainContainer';
import NewsDetailContainer from '../screens/News/NewsDetailContainer';
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
        options={{
          headerTitle: '새소식',
        }}
        name="notice"
        component={NewsMainContainer}
      />
      <Stack.Screen
        options={{
          headerTitle: '지점 공지사항',
        }}
        name="branch"
        component={NewsBranchMainContainer}
      />
      <Stack.Screen
        options={{
          headerTitle: '지점 공지사항',
        }}
        name="detail"
        component={NewsDetailContainer}
      />
    </Stack.Navigator>
  );
};
