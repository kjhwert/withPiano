import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {IUser} from './types/User';
const {height} = Dimensions.get('window');

interface IProps {
  user: IUser;
  navigation: any;
  logout: Function;
}

export default (props: IProps) => {
  const user = props.user.user;
  const navigation = props.navigation;

  const routes = [
    {
      img: require('../Assets/profile.png'),
      route: '내정보',
    },
    {
      img: require('../Assets/notice.png'),
      route: '새소식',
    },
    {
      img: require('../Assets/lesson.png'),
      route: '레슨예약',
    },
    {
      img: require('../Assets/reservation.png'),
      route: '예약내역',
    },
    {
      img: require('../Assets/grade.png'),
      route: '레슨평가',
    },
    {
      img: require('../Assets/alarm.png'),
      route: '알림',
    },
  ];

  const logout = async () => {
    props.logout();
    navigation.navigate('login');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          {...props}
          label={() => (
            <Image
              source={require('../Assets/close.png')}
              style={{width: 20, height: 20}}
            />
          )}
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          style={{width: '15%'}}
        />
        <DrawerItem
          style={{flex: 1, alignItems: 'center'}}
          label={() => (
            <View style={styles.profileWrapper}>
              <Image
                source={require('../Assets/profile2.png')}
                style={{width: 100, height: 100}}
              />
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          )}
          onPress={() => {}}
        />

        {routes.map((route, idx) => (
          <DrawerItem
            label={() => (
              <View style={styles.drawerContainer}>
                <Image source={route.img} style={styles.drawerImages} />
                <Text style={{color: 'white'}}>{route.route}</Text>
              </View>
            )}
            onPress={() => {
              navigation.navigate(route.route);
            }}
            key={idx}
          />
        ))}

        {/*{state.routeNames.map((route: string, idx: number) => (*/}
        {/*  <DrawerItem*/}
        {/*    label={() => (*/}
        {/*      <View style={styles.drawerContainer}>*/}
        {/*        <Image source={route[idx]} style={styles.drawerImages} />*/}
        {/*        <Text style={{color: 'white'}}>{route}</Text>*/}
        {/*      </View>*/}
        {/*    )}*/}
        {/*    onPress={() => {*/}
        {/*      navigation.navigate(route);*/}
        {/*    }}*/}
        {/*    key={idx}*/}
        {/*    style={state.index === idx ? {backgroundColor: '#000000'} : {}}*/}
        {/*  />*/}
        {/*))}*/}
      </DrawerContentScrollView>
      <DrawerItem
        label={() => (
          <View style={styles.loginWrapper}>
            <Text style={styles.loginText}>로그아웃</Text>
            <Image
              source={require('../Assets/logout.png')}
              style={{width: 20, height: 20}}
            />
          </View>
        )}
        onPress={() => {
          logout();
          navigation.navigate('login');
        }}
        style={{marginTop: height - 700, alignItems: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  userName: {
    color: 'white',
    marginTop: 5,
    fontSize: 16,
  },
  userEmail: {
    color: '#a77d2c',
    marginTop: 5,
  },
  drawerContainer: {flexDirection: 'row', alignItems: 'center'},
  drawerImages: {width: 20, height: 20, marginRight: 10},
  loginText: {color: 'white', fontSize: 12, marginRight: 5},
  loginWrapper: {flexDirection: 'row', alignItems: 'center'},
});
