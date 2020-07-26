import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import LessonContext from './context/LessonContext';
import {ITeacher} from './types/Teacher';
import {paletteTimes, pianoTimes} from './global';
const {width} = Dimensions.get('window');
const boxSize = Math.floor((width - 40) / 8);

interface IProps {
  times: any;
  teacher: ITeacher;
  navigation: any;
  academyType: string;
  params: {
    storeId: number;
    paymentId: number;
  };
}

export default ({times, teacher, navigation, academyType, params}: IProps) => {
  const {reserve} = useContext(LessonContext);
  const baseWeeks = ['', '월', '화', '수', '목', '금', '토', '일'];
  const activeColor =
    academyType === 'piano'
      ? 'rgba(250, 197, 96, 0.8)'
      : 'rgba(170, 122, 120, 0.8)';

  const baseTimes = academyType === 'piano' ? pianoTimes : paletteTimes;

  const hasLesson = (weekIdx: number, time: string) => {
    return (
      times[weekIdx] &&
      times[weekIdx][`${time}`] &&
      times[weekIdx][`${time}`].includes(teacher.id)
    );
  };

  const hasReserved = (weekIdx: number, time: Object) => {
    return times[weekIdx] && times[weekIdx][`${time}`] === 'mine';
  };

  const isOdd = (num: number) => {
    return num % 2 === 1;
  };

  const dateFormat = (date: string) => {
    return date.replace('/', '월 ') + '일';
  };

  const hasBaseTimes = () => {
    return baseTimes && baseTimes.length > 0;
  };

  const confirmReserve = (time: string, weekIdx: number) => {
    Alert.alert(
      '레슨예약',
      `${teacher.name}(${teacher.major}) 선생님\n${dateFormat(
        times.weeks[weekIdx - 1],
      )} ${baseWeeks[weekIdx]}요일 ${time}`,
      [
        {
          text: '취소',
          onPress: () => {},
        },
        {
          text: '예약하기',
          onPress: () => onReserve(time, weekIdx),
        },
      ],
      {cancelable: false},
    );
  };

  const onReserve = async (time: string, weekIdx: number) => {
    const data = {
      paymentId: params.paymentId,
      teacherId: teacher.id,
      year: times.year,
      month: Number(times.weeks[weekIdx - 1].substring(0, 2)),
      day: Number(times.weeks[weekIdx - 1].substring(3, 5)),
      hour: Number(time.substring(0, 2)),
      minute: Number(time.substring(4, 5)),
      time: time.substring(0, 4),
    };

    const result = await reserve(data);
    if (result.status === 200) {
      Alert.alert('예약되었습니다.');
      return navigation.navigate('예약내역');
    }

    Alert.alert('', result.data.msg);
  };

  return (
    <View style={styles.tableContainer}>
      {baseWeeks.map((week, weekIdx) => (
        <View style={{flexDirection: 'column'}} key={weekIdx}>
          {hasBaseTimes &&
            baseTimes.map((time, timeIdx) => {
              if (weekIdx === 0) {
                return (
                  <View style={styles.timeWrapper} key={timeIdx}>
                    <Text style={styles.timeText}>{time}</Text>
                  </View>
                );
              }

              if (timeIdx === 0) {
                return (
                  <View style={styles.weekWrapper} key={weekIdx}>
                    <Text>{week}</Text>
                    <Text style={{fontSize: 10, color: '#686868'}}>
                      {times.weeks[weekIdx - 1]}
                    </Text>
                  </View>
                );
              }

              if (hasReserved(weekIdx, time)) {
                return (
                  <View
                    style={[
                      isOdd(timeIdx)
                        ? [styles.evenColumn, styles.inActiveLesson]
                        : styles.inActiveLesson,
                      timeIdx + 1 === baseTimes.length && styles.lastIndex,
                      weekIdx === 1 && styles.firstIndex,
                    ]}
                    key={timeIdx + 'a'}>
                    <Image
                      source={require('../Assets/check.png')}
                      style={{width: 20, height: 20}}
                    />
                  </View>
                );
              }

              return hasLesson(weekIdx, time) ? (
                <View
                  style={isOdd(timeIdx) && styles.evenColumn}
                  key={timeIdx + 'b'}>
                  <TouchableOpacity
                    style={[
                      styles.activeLesson,
                      timeIdx + 1 === baseTimes.length && styles.lastIndex,
                      weekIdx === 1 && styles.firstIndex,
                      {backgroundColor: activeColor},
                    ]}
                    onPress={() => {
                      confirmReserve(time, weekIdx);
                    }}
                  />
                </View>
              ) : (
                <View
                  style={isOdd(timeIdx) ? styles.evenColumn : {}}
                  key={timeIdx + 'c'}>
                  <View
                    key={timeIdx}
                    style={[
                      styles.inActiveLesson,
                      timeIdx + 1 === baseTimes.length && styles.lastIndex,
                      weekIdx === 1 && styles.firstIndex,
                    ]}
                  />
                </View>
              );
            })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 10,
    marginBottom: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  weeksContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  activeLesson: {
    height: boxSize,
    width: boxSize,
    borderRightWidth: 0.3,
    borderRightColor: '#b5b5b5',
  },
  inActiveLesson: {
    height: boxSize,
    width: boxSize,
    borderRightWidth: 0.3,
    borderRightColor: '#b5b5b5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstIndex: {
    borderLeftWidth: 0.3,
    borderLeftColor: '#b5b5b5',
    borderRightWidth: 0.3,
    borderRightColor: '#b5b5b5',
  },
  lastIndex: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#b5b5b5',
  },
  evenColumn: {
    backgroundColor: '#d4d4d4',
  },
  timeWrapper: {
    width: boxSize,
    height: boxSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekWrapper: {
    width: boxSize,
    height: boxSize,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  timeText: {
    fontSize: 12,
    color: '#686868',
  },
});
