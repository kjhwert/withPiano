import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface IProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default ({state, descriptors, navigation}: IProps) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route: any, index: number) => {
        if (route.name === '내정보') {
          return;
        }

        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getImage = () => {
          if (route.name === '새소식') {
            return !isFocused
              ? require('../Assets/notice.png')
              : require('../Assets/notice-active.png');
          }
          if (route.name === '레슨예약') {
            return !isFocused
              ? require('../Assets/lesson.png')
              : require('../Assets/lesson-active.png');
          }
          if (route.name === '예약내역') {
            return !isFocused
              ? require('../Assets/reservation.png')
              : require('../Assets/reservation-active.png');
          }
          if (route.name === '레슨평가') {
            return !isFocused
              ? require('../Assets/grade.png')
              : require('../Assets/grade-active.png');
          }
          if (route.name === '알림') {
            return !isFocused
              ? require('../Assets/alarm.png')
              : require('../Assets/alarm-active.png');
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, backgroundColor: 'black'}}
            key={index}>
            <View
              style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <Image
                source={getImage()}
                style={{width: 20, height: 20, marginBottom: 5}}
              />
              <Text
                style={{
                  color: isFocused ? '#fac560' : '#ffffff',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
