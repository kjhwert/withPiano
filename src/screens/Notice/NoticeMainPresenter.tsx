import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {fcmServices} from '../../FCMService';
import {localNotificationService} from '../../LocalNotificationService';
import DeviceInfo from 'react-native-device-info';
import {userApi} from '../../Components/api';
import UserContext from '../../Components/context/UserContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';

export default ({data, refresh, onRefresh}: any) => {
  const [isEnabled, setIsEnabled] = useState(fcmServices.enabled);
  const {user}: any = useContext(UserContext);
  const toggleSwitch = async () => {
    setIsEnabled(!isEnabled);
    if (isEnabled) {
      console.log('alarm off');
      fcmServices.enabled = false;
      if (Platform.OS === 'ios') {
        PushNotificationIOS.abandonPermissions();
      }
      fcmServices.deleteToken();
      Alert.alert('푸시알람을 수신거부 하였습니다.');
    } else {
      console.log('alarm on');
      fcmServices.enabled = true;

      fcmServices.registerAppWithFCM();
      fcmServices.register(onRegister, onNotification, onOpenNotification);
      localNotificationService.configure(onOpenNotification);

      Alert.alert('푸시알람을 수신허용 하였습니다.');

      async function onRegister(token) {
        const uuid = DeviceInfo.getUniqueId();
        console.log(`[App] onRegister token: ${token}`);
        // console.log(`device uuid: ${uuid}`);
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
    }
  };

  const isRead = (read: number) => {
    return read ? styles.read : styles.unRead;
  };

  const checkPushPermission = () => {
    if (Platform.OS === 'android') {
      messaging()
        .hasPermission()
        .then((enable) => {
          if (enable) {
            setIsEnabled(true);
          }
        });
    }
    if (Platform.OS === 'ios') {
      PushNotificationIOS.checkPermissions((result) => console.log(result));
    }
  };

  useEffect(() => {}, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>알림설정</Text>
        <Switch
          trackColor={{false: '#767577', true: '#fac560'}}
          thumbColor={isEnabled ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#767577"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {data.map((item, idx) => (
        <View key={idx} style={styles.noticeWrapper}>
          <View style={[styles.noticeDateWrapper, isRead(item.read)]}>
            <Text style={styles.noticeDate} />
          </View>
          <View style={styles.noticeContent}>
            <Image
              source={require('../../Assets/bell.png')}
              style={styles.noticeImage}
            />
            <View style={styles.noticeTitleWrapper}>
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Image
                source={require('../../Assets/arrow-gray.png')}
                style={styles.arrowImage}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 30,
  },
  settingText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  noticeWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
  },
  noticeDate: {
    color: '#666666',
    fontSize: 11,
  },
  noticeContent: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  noticeImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  noticeDateWrapper: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  noticeTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noticeTitle: {
    color: '#686868',
  },
  arrowImage: {
    width: 10,
    height: 10,
  },
  read: {
    backgroundColor: '#cccccc',
  },
  unRead: {
    backgroundColor: '#fac560',
  },
});
