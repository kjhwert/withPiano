import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDate} from './global';
import ReserveInfo from './ReserveInfo';
import LessonContext from './context/LessonContext';

export default ({data, navigation}) => {
  const {changeType, onChangePayment} = useContext(LessonContext);
  const hasLesson = (cnt: number) => cnt > 0;

  const moveToTimePage = (type, payment) => {
    changeType(type);
    onChangePayment(payment);
    navigation.navigate('time');
  };

  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require('../Assets/branch.png')}
        />
        <View style={styles.headerWrapper}>
          <Text style={[styles.textWhite, styles.headerTitle]}>
            {data.storeName}
          </Text>
          <Text style={[styles.textWhite, styles.headerDate]}>
            {getDate(data.regDate)}
          </Text>
        </View>
      </View>

      {hasLesson(data.lessonCnt) && (
        <ReserveInfo data={data.cnt} type={'piano'} />
      )}

      {hasLesson(data.palleteLessonCnt) && (
        <ReserveInfo data={data.palleteCnt} type={'art'} />
      )}

      <View style={styles.paymentContainer}>
        <View style={styles.paymentWrapper}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/package.png')}
              style={styles.paymentImg}
            />
          </View>
          <View style={styles.paymentContent}>
            <Text style={[styles.paymentText, {alignSelf: 'center'}]}>
              패키지
            </Text>
            <Text style={styles.paymentText}>{data.packageName}</Text>
          </View>
        </View>

        <View style={styles.paymentWrapper}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/coin.png')}
              style={styles.paymentImg}
            />
          </View>
          <View style={styles.paymentContent}>
            <Text style={[styles.paymentText, {alignSelf: 'center'}]}>
              결제금액
            </Text>
            <Text style={styles.paymentText}>{data.payAmount} 원</Text>
          </View>
        </View>

        <View style={styles.paymentWrapper}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/calendar-gray.png')}
              style={styles.paymentImg}
            />
          </View>
          <View style={styles.paymentContent}>
            <Text style={[styles.paymentText, {alignSelf: 'center'}]}>
              시작날짜
            </Text>
            <Text style={styles.paymentText}>{getDate(data.startDate)}</Text>
          </View>
        </View>

        <View style={styles.paymentWrapper}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/calendar-gray.png')}
              style={styles.paymentImg}
            />
          </View>
          <View style={styles.paymentContent}>
            <Text style={[styles.paymentText, {alignSelf: 'center'}]}>
              종료날짜
            </Text>
            <Text style={styles.paymentText}>{getDate(data.endDate)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <View style={styles.paymentWrapper}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/calendar-gray.png')}
              style={styles.paymentImg}
            />
          </View>
          <View style={styles.paymentContent}>
            <Text style={[styles.paymentText, {alignSelf: 'center'}]}>
              홀딩시작
            </Text>
            <Text style={styles.paymentText}>
              {data.holdingStart ? getDate(data.holdingStart) : ''}
            </Text>
          </View>
        </View>

        <View style={styles.paymentWrapper}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../Assets/video.png')}
              style={styles.paymentImg}
            />
          </View>
          <View style={styles.paymentContent}>
            <Text style={[styles.paymentText, {alignSelf: 'center'}]}>
              홀딩종료
            </Text>
            <Text style={styles.paymentText}>
              {data.holdingEnd ? getDate(data.holdingEnd) : ''}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.reserveBtnWrapper}>
        {hasLesson(data.lessonCnt) && (
          <TouchableOpacity
            onPress={() => {
              moveToTimePage('piano', {
                storeId: data.storeId,
                paymentId: data.id,
              });
            }}
            style={[styles.reserveBtn, styles.pianoBtn]}>
            <Text style={[styles.textWhite, {fontWeight: 'bold'}]}>
              피아노 레슨 예약
            </Text>
          </TouchableOpacity>
        )}
        {hasLesson(data.palleteLessonCnt) && (
          <TouchableOpacity
            onPress={() => {
              moveToTimePage('pallete', {
                storeId: data.storeId,
                paymentId: data.id,
              });
            }}
            style={[styles.reserveBtn, styles.artBtn]}>
            <Text style={[styles.textWhite, {fontWeight: 'bold'}]}>
              팔레트 레슨 예약
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  headerImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  headerWrapper: {
    marginLeft: 10,
    marginBottom: -3,
  },
  textWhite: {
    color: 'white',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerDate: {
    fontSize: 12,
  },
  paymentContainer: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
  },
  paymentWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#dadada',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  paymentImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  paymentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  paymentText: {
    color: '#aaaaaa',
    fontSize: 13,
  },
  reserveBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  reserveBtn: {
    width: '40%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  pianoBtn: {
    backgroundColor: '#a77d2d',
  },
  artBtn: {
    backgroundColor: '#aa7a78',
  },
});
