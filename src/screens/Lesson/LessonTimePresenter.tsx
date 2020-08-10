import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TimeTable from '../../Components/TimeTable';
import {ITeacher} from '../../Components/types/Teacher';
import {ITime} from '../../Components/types/Time';

interface IProps {
  navigation: any;
  times: Array<ITime>;
  teachers: Array<ITeacher>;
  academyType: string;
  getTimes: () => {};
  params: {
    storeId: number;
    paymentId: number;
  };
  onRefresh: Function;
}

export default ({
  navigation,
  times,
  teachers,
  academyType,
  params,
  refresh,
  onRefresh,
}: IProps) => {
  const [timeSelected, setTimesSelected] = useState(times[0]);
  const color = academyType === 'piano' ? '#d4a45a' : '#b56564';
  const teacherColor = academyType === 'piano' ? '#d4a45a' : '#b56564';

  const [teacherSelected, setTeacherSelected] = useState({
    id: -1,
    academyType: '',
    name: '',
    major: '',
    storeId: 0,
  });

  const activeTeacher = (time: ITime) => {
    return teachers.filter((item) => {
      return time.availableTeachers.includes(item.id);
    });
  };

  const [activeTeachers, setActiveTeachers] = useState(activeTeacher(times[0]));

  const onChangeTime = (time: ITime) => {
    setTimesSelected(time);
    setActiveTeachers(activeTeacher(time));
  };

  const onChangeTeacher = (teacher: ITeacher) => {
    setTeacherSelected(teacher);
  };

  const isWeekSelected = (idx: number) => {
    return timeSelected && timeSelected.id === idx;
  };

  const isTeacherSelected = (id: number) => {
    return teacherSelected && teacherSelected.id === id;
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <View style={styles.weekContainer}>
        {times.map((time, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.weekBtn,
              isWeekSelected(idx) && {backgroundColor: color},
            ]}
            onPress={() => {
              onChangeTime(time);
            }}>
            <Text
              style={[
                styles.weekBtnText,
                isWeekSelected(idx) && styles.weekSelectedText,
              ]}>
              {time.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.teacherContainer} horizontal={true}>
        {activeTeachers.map((teacher: ITeacher, idx: number) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.teacherBtn,
              isTeacherSelected(teacher.id) && {backgroundColor: teacherColor},
            ]}
            onPress={() => {
              onChangeTeacher(teacher);
            }}>
            <Text
              style={[
                styles.teacherBtnText,
                isTeacherSelected(teacher.id) && styles.teacherSelectedBtnText,
              ]}>
              {teacher.name}
              {academyType === 'piano'
                ? teacher.major === '재즈'
                  ? '(J)'
                  : '(C)'
                : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.timeTableContainer}>
        <View style={styles.timeTableHeader}>
          <Text style={styles.timeTableHeaderTitle}>{timeSelected.title}</Text>
          <Image
            source={require('../../Assets/calendar-gray.png')}
            style={styles.timeTableHeaderImage}
          />
        </View>

        <TimeTable
          times={timeSelected}
          teacher={teacherSelected}
          navigation={navigation}
          academyType={academyType}
          params={params}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  weekContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
  },
  weekBtn: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  weekBtnText: {
    fontSize: 12,
    color: 'black',
  },
  weekSelectedText: {color: 'white', fontWeight: 'bold'},
  teacherBtn: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
    marginRight: 5,
  },
  teacherBtnText: {
    fontSize: 12,
    color: 'black',
  },
  teacherSelectedBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  teacherContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  timeTableContainer: {
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 10,
  },
  timeTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d4d4d4',
    paddingBottom: 15,
    padding: 20,
    height: 60,
  },
  timeTableHeaderTitle: {
    color: '#a77d2d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeTableHeaderImage: {
    width: 15,
    height: 15,
  },
});
