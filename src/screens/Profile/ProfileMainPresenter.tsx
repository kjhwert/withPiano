import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IUser} from '../../Components/types/User';

interface IProps {
  navigation: any;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export default ({navigation, user}: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../Assets/profile3.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.name}</Text>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.profileInfoWrapper}>
            <Text>이메일</Text>
            <Text>전화번호</Text>
          </View>
          <View style={styles.profileAddWrapper}>
            <Text style={styles.text}>{user.email}</Text>
            <Text style={styles.text}>{user.phone}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={() => {
              navigation.navigate('pw');
            }}>
            <Image
              source={require('../../Assets/profileChange.png')}
              style={styles.images}
            />
            <Text style={styles.imagesText}>내 정보 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={() => {
              navigation.navigate('payment');
            }}>
            <Image
              source={require('../../Assets/task.png')}
              style={styles.images}
            />
            <Text style={styles.imagesText}>결제 내역</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={() => {
              navigation.navigate('레슨평가');
            }}>
            <Image
              source={require('../../Assets/note.png')}
              style={styles.images}
            />
            <Text style={styles.imagesText}>레슨 내역 및 평가</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  profileContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  profileName: {
    marginTop: 10,
    fontSize: 16,
  },
  footerContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    paddingTop: 25,
  },
  profileInfo: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d4d4d4',
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 15,
    paddingRight: 15,
    padding: 30,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  images: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  imagesText: {
    fontSize: 12,
    color: '#888888',
  },
  profileInfoWrapper: {
    justifyContent: 'space-between',
    height: 50,
    marginRight: 15,
  },
  profileAddWrapper: {justifyContent: 'space-between', height: 50},
  text: {color: '#9a9a9a'},
});
