import React from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDate, getTime} from '../../Components/global';
import {IReserved} from '../../Components/types/Reserved';

interface IProps {
  reserved: Array<IReserved>;
  cancel: Function;
  refresh: boolean;
  onRefresh: Function;
}

export default ({reserved, cancel, refresh, onRefresh}: IProps) => {
  const cancelConfirm = (id: number) => {
    Alert.alert(
      '예약취소',
      '레슨을 취소하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => {},
        },
        {
          text: '확인',
          onPress: async () => {
            await onCancel(id);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onCancel = async (id: number) => {
    const result = await cancel(id);
    if (result.status !== 200) {
      return Alert.alert(result.data.msg);
    }

    Alert.alert('취소되었습니다.');
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      {reserved.map((reserve, idx) => (
        <View key={idx} style={styles.reservedContainer}>
          <Image
            source={require('../../Assets/time.png')}
            style={styles.timeImage}
          />
          <View style={styles.reservedWrapper}>
            <View style={{width: 110}}>
              <Text style={styles.reservedTime}>
                {getTime(reserve.lesson.date)}
              </Text>
              <Text style={styles.reservedDate}>
                {getDate(reserve.lesson.date)}
              </Text>
            </View>
            <View style={styles.teacherWrapper}>
              <Text>{reserve.teacherName}</Text>
              <Text
                style={
                  styles.storeName
                }>{`${reserve.storeName}|${reserve.teacherMajor}`}</Text>
            </View>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                cancelConfirm(reserve.lesson.id);
              }}>
              <Text style={styles.cancelBtnText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={{height: 60}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  reservedContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  timeImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  reservedTime: {
    color: '#686868',
    fontSize: 15,
    letterSpacing: 1,
  },
  reservedDate: {
    color: '#a1a1a1',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  reservedWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#a77d2d',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  storeName: {
    fontSize: 12,
    color: '#686868',
  },
  teacherWrapper: {alignItems: 'center', justifyContent: 'center'},
});
