import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet} from 'react-native';
import EvaluateMainContainer from '../screens/Evaluate/EvaluateMainContainer';
import EvaluateContainer from '../screens/Evaluate/EvaluateContainer';
import Menu from '../Components/Menu';
import {EvaluateConTextProvider} from '../Components/context/EvaluateContext';

const Stack = createStackNavigator();

export default ({navigation}) => {
  return (
    <EvaluateConTextProvider>
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
          options={{
            headerTitle: '레슨조회 및 평가',
          }}
          name="index"
          component={EvaluateMainContainer}
        />
        <Stack.Screen
          options={{
            headerTitle: '레슨조회 및 평가',
          }}
          name="grade"
          component={EvaluateContainer}
        />
      </Stack.Navigator>
    </EvaluateConTextProvider>
  );
};
