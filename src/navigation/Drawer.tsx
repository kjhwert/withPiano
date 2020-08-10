import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import DrawerComponent from '../Components/DrawerComponent';
import UserContext from '../Components/context/UserContext';
import {fcmServices} from '../FCMService';
import {localNotificationService} from '../LocalNotificationService';
import DeviceInfo from 'react-native-device-info';
import {userApi} from '../Components/api';
import {Alert} from 'react-native';

const Drawer = createDrawerNavigator();

export default () => {
  const {user, logout} = useContext(UserContext);

  useEffect(() => {
    fcmServices.registerAppWithFCM();
    fcmServices.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    async function onRegister(token) {
      const uuid = DeviceInfo.getUniqueId();
      console.log(`[App] onRegister token: ${token}, device uuid: ${uuid}`);
      await userApi.registerToken(uuid, token, user);
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };

      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      Alert.alert(notify.title, notify.body);
    }

    return () => {
      console.log('[App] unRegister');
      fcmServices.unRegister();
      localNotificationService.unregister();
    };
  }, []);

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
