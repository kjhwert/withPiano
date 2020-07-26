import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EvaluateContext from '../../Components/context/EvaluateContext';
import {getDate, getTime} from '../../Components/global';
import {ILesson} from '../../Components/types/Lesson';

interface IProps {
  navigation: any;
  lesson: ILesson;
}

export default ({navigation, lesson}: IProps) => {
  const {saveEvaluate} = useContext(EvaluateContext);

  const [state, setState] = useState({
    lesson: {
      id: null,
      teacherId: null,
      paymentId: null,
      date: '',
      stars: 0,
      eval: '',
    },
    teacherName: '',
    teacherMajor: '',
    storeName: '',
  });

  const getLesson = () => {
    setState(lesson);
  };

  const onSubmit = async () => {
    const data = {
      id: state.lesson.id,
      stars: state.lesson.stars,
      eval: state.lesson.eval,
    };

    const result = await saveEvaluate(data);

    if (result.status === 200) {
      Alert.alert('등록되었습니다.');
      navigation.navigate('index');
    }
  };

  const getStars = (stars: number) => {
    let result = [];
    for (let i = 1; i <= stars; i++) {
      result.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            onChangeStar(i);
          }}>
          <Image
            source={require('../../Assets/star-fill.png')}
            style={styles.star}
          />
        </TouchableOpacity>,
      );
    }

    for (let i = stars + 1; i <= 5; i++) {
      result.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            onChangeStar(i);
          }}>
          <Image
            source={require('../../Assets/star-empty.png')}
            style={styles.star}
          />
        </TouchableOpacity>,
      );
    }

    return result;
  };

  const onChangeStar = (idx: number) => {
    setState({...state, lesson: {...state.lesson, stars: idx}});
  };

  useEffect(() => {
    getLesson();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={{marginRight: 30}}>
          <Text style={styles.teacher}>{state.teacherName}</Text>
          <View style={styles.teacherWrapper}>
            <Text style={styles.teacherText}>
              {`${state.storeName}|${state.teacherMajor}`}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.getTime}>{getTime(state.lesson.date)}</Text>
          <Text style={styles.getDate}>{getDate(state.lesson.date)}</Text>
        </View>
      </View>
      <View style={styles.starContainer}>{getStars(state.lesson.stars)}</View>
      <View style={styles.evalContainer}>
        <TextInput
          placeholder="내용을 입력하세요"
          value={state.lesson.eval}
          onChangeText={(text) => {
            setState({...state, lesson: {...state.lesson, eval: text}});
          }}
          multiline={true}
          textAlignVertical="top"
          style={{height: 200}}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          onSubmit();
        }}
        style={styles.summitBtn}>
        <Text style={styles.summitBtnText}>평가하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  info: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  star: {width: 30, height: 30},
  evalContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  teacher: {color: '#686868', fontWeight: 'bold', marginBottom: 4},
  summitBtn: {
    backgroundColor: '#a77d2d',
    padding: 15,
    borderRadius: 8,
  },
  summitBtnText: {color: 'white', fontWeight: 'bold', textAlign: 'center'},
  teacherWrapper: {flexDirection: 'row', justifyContent: 'center'},
  teacherText: {color: '#a1a1a1', fontSize: 10},
  getTime: {color: '#686868', fontWeight: 'bold', marginBottom: 4},
  getDate: {color: '#a1a1a1', fontSize: 10},
});
