import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {userApi} from '../../Components/api';
import UserContext from '../../Components/context/UserContext';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const {user} = useContext(UserContext);
  const [state, setState] = useState({
    pw1: '',
    pw2: '',
  });

  const changePw = async () => {
    const {pw1, pw2} = state;

    if (pw1 !== pw2) {
      return Alert.alert('비밀번호가 일치하지 않습니다.');
    }

    if (pw1.length < 6) {
      return Alert.alert('비밀번호는 최소 6자 이상이여야 합니다.');
    }

    const result = await userApi.changePw(pw1, user);
    if (result.status === 200) {
      Alert.alert('변경되었습니다.');
      navigation.navigate('index');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pwContainer}>
        <View style={styles.pwWrapper}>
          <Text style={styles.pwText}>비밀번호</Text>
          <TextInput
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.inputText}
            value={state.pw1}
            onChangeText={(text) => setState({...state, pw1: text})}
          />
        </View>
        <View style={styles.pwWrapper}>
          <Text style={styles.pwText}>비밀번호 확인</Text>
          <TextInput
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.inputText}
            value={state.pw2}
            onChangeText={(text) => setState({...state, pw2: text})}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.changeBtn}
            onPress={() => {
              changePw();
            }}>
            <Text style={styles.changeBtnText}>비밀번호 변경</Text>
            <Image
              source={require('../../Assets/arrow.png')}
              style={{width: 7, height: 7, resizeMode: 'contain'}}
            />
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
  pwContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 25,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  pwWrapper: {flexDirection: 'row', marginBottom: 20},
  inputText: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    marginTop: -10,
  },
  changeBtn: {
    backgroundColor: '#c78e4b',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeBtnText: {
    color: 'white',
    fontSize: 12,
    marginRight: 10,
  },
  pwText: {width: '25%', fontSize: 12, color: '#666666'},
});
