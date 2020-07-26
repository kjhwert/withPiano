import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import DrawerComponent from '../Components/DrawerComponent';
import UserContext from '../Components/context/UserContext';

const Drawer = createDrawerNavigator();

interface IProps {
  navigation: any;
}

export default ({navigation, route}: IProps) => {
  const {user, logout} = useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName="새소식"
      drawerPosition="right"
      drawerStyle={{
        backgroundColor: '#333333',
      }}
      drawerContentOptions={{
        activeTintColor: 'white',
        activeBackgroundColor: '#000000',
        inactiveTintColor: '#cccccc',
      }}
      drawerContent={(props) => (
        <DrawerComponent {...props} user={user} logout={logout} />
      )}>
      <Drawer.Screen name="Home" component={BottomTab} />
    </Drawer.Navigator>
  );
};
