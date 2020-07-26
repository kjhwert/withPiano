import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileMainContainer from '../screens/Profile/ProfileMainContainer';
import PwChangeContainer from '../screens/Profile/PwChangeContainer';
import Menu from '../Components/Menu';
import PaymentContainer from '../screens/Profile/PaymentContainer';

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
        headerRight: () => {
          return <Menu navigation={navigation} />;
        },
        animationEnabled: false,
        headerBackTitleVisible: false,
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '내 정보',
        }}
        component={ProfileMainContainer}
      />
      <Stack.Screen
        name="pw"
        options={{
          headerTitle: '비밀번호 변경',
        }}
        component={PwChangeContainer}
      />
      <Stack.Screen
        name="payment"
        options={{
          headerTitle: '결제내역',
        }}
        component={PaymentContainer}
      />
    </Stack.Navigator>
  );
};
