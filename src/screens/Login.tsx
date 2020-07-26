import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {userApi} from '../Components/api';
import UserContext from '../Components/context/UserContext';
const {width} = Dimensions.get('window');

interface IState {
  email: string;
  password: string;
}

export default ({navigation}: any) => {
  const [state, setState] = useState<IState>({
    email: '',
    password: '',
  });

  const {saveUser} = useContext(UserContext);

  const login = async () => {
    const result = await userApi.login(state);

    if (result.status !== 200) {
      return Alert.alert(result.data.msg);
    }

    saveUser(result.data);
    navigation.navigate('main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image
          source={require('../Assets/logo.jpg')}
          style={styles.brandLogo}
        />
        <Text style={{color: '#fac560'}}>
          위드피아노 어플을 통해 간편하게 예약하세요.
        </Text>
        <View style={styles.userEmailContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#fefefe"
            autoCapitalize="none"
            value={state.email}
            onChangeText={(text) => setState({...state, email: text})}
            style={styles.inputText}
          />
          <Image
            source={require('../Assets/profile.png')}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.userPwContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#fefefe"
            secureTextEntry={true}
            autoCapitalize="none"
            value={state.password}
            onChangeText={(text) => setState({...state, password: text})}
            style={styles.inputText}
          />
          <Image
            source={require('../Assets/lock.png')}
            style={styles.lockImage}
          />
        </View>
        <TouchableOpacity onPress={login} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../Assets/login.png')}
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  brandLogo: {
    width: '48%',
    height: 50,
    resizeMode: 'contain',
    marginLeft: -5,
  },
  userEmailContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#fefefe',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 70,
  },
  inputText: {
    color: '#ffffff',
    flex: 1,
    padding: 5,
  },
  profileImage: {width: 20, height: 20, resizeMode: 'contain'},
  userPwContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#fefefe',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 20,
  },
  lockImage: {width: 20, height: 20, resizeMode: 'contain'},
  loginBtn: {backgroundColor: '#fac560', padding: 15, borderRadius: 30},
  loginBtnText: {color: 'white', fontWeight: 'bold', textAlign: 'center'},
  backgroundImage: {width: width, height: 300, resizeMode: 'contain'},
});
