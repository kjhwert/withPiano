import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

class FCMService {
  enabled = false;

  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          // User has permissions
          this.enabled = true;
          console.log('permission allowed : ', this.enabled);
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          console.log('request permission: ', this.enabled);
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('[FCMService] Permission rejected', error);
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch((error) => {
        console.log('[FCMService] getToken rejected', error);
      });
  };

  requestPermission = (onRegister) => {
    console.log('enabled : ', this.enabled);
    messaging()
      .requestPermission()
      .then((enable) => {
        if (enable) {
          this.enabled = true;
          this.getToken(onRegister);
        }
      })
      .catch((error) => {
        this.enabled = false;
        console.log('[FCMService] Request Permission rejected', error);
      });
  };

  abandonPermission = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.abandonPermissions();
    }

    if (Platform.OS === 'android') {
      PushNotification.abandonPermissions();
    }

    Alert.alert('푸시알람을 수신거부하셨습니다.');
  };

  deleteToken = () => {
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('[FCMService] Delete token error', error);
      });
    this.enabled = false;
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open',
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });

    // When the application is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          '[FCMService] getInitialNotification Notification caused app to open',
        );

        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A new FCM message arrived!', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }

        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmServices = new FCMService();
