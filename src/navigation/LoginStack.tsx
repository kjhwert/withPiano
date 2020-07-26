import React, {useContext} from 'react';
import Login from '../screens/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Drawer from './Drawer';
import UserContext from '../Components/context/UserContext';
import Loading from '../Components/Loading';

const Stack = createStackNavigator();

export default () => {
  const {user, loading} = useContext(UserContext);
  return !loading ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user && user.token !== '' ? (
        <>
          <Stack.Screen name="main" component={Drawer} />
          <Stack.Screen name="login" component={Login} />
        </>
      ) : (
        <>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="main" component={Drawer} />
        </>
      )}
    </Stack.Navigator>
  ) : (
    <Loading />
  );
};
