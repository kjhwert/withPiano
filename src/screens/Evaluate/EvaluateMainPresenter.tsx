import React, {useContext} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDate, getTime} from '../../Components/global';
import EvaluateContext from '../../Components/context/EvaluateContext';
import {ILesson} from '../../Components/types/Lesson';

interface IProps {
  navigation: any;
  lessons: Array<ILesson>;
  refresh: boolean;
  onRefresh: Function;
}

export default ({navigation, lessons, refresh, onRefresh}: IProps) => {
  const {getShow} = useContext(EvaluateContext);

  const getStars = (star: number) => {
    let stars = [];
    for (let i = 1; i <= star; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../../Assets/star-fill.png')}
          style={styles.lessonStar}
        />,
      );
    }

    for (let i = star + 1; i <= 5; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../../Assets/star-empty.png')}
          style={styles.lessonStar}
        />,
      );
    }

    return stars;
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      {lessons.map((lesson: ILesson, idx: number) => (
        <View style={styles.lessonContainer} key={idx}>
          <View style={{width: 100}}>
            <Text style={styles.lessonTime}>{getTime(lesson.lesson.date)}</Text>
            <Text style={styles.lessonDate}>{getDate(lesson.lesson.date)}</Text>
          </View>
          <View>
            <Text style={styles.teacherName}>{lesson.teacherName}</Text>
            <View style={styles.storeWrapper}>
              <Text style={styles.storeInfo}>
                {`${lesson.storeName}|${lesson.teacherMajor}`}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            {getStars(lesson.lesson.stars)}
          </View>
          <TouchableOpacity
            style={styles.evaluateBtn}
            onPress={() => {
              getShow(lesson);
              navigation.navigate('grade');
            }}>
            <Text style={styles.evaluateBtnText}>평가</Text>
          </TouchableOpacity>
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
  lessonContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  lessonTime: {
    color: '#686868',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lessonDate: {color: '#a1a1a1', fontSize: 10},
  teacherName: {color: '#686868', fontWeight: 'bold', marginBottom: 4},
  storeWrapper: {flexDirection: 'row', justifyContent: 'center'},
  storeInfo: {color: '#a1a1a1', fontSize: 10},
  evaluateBtn: {
    backgroundColor: '#a77d2d',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  },
  evaluateBtnText: {color: 'white', fontWeight: 'bold'},
  lessonStar: {width: 15, height: 15},
});
