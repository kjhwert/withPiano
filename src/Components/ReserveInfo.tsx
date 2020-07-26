import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

interface IProps {
  data: {
    use: number;
    book: number;
    unused: number;
  };
  type: string;
}

export default ({data, type}: IProps) => {
  const isPiano = () => {
    return type === 'piano';
  };

  const state = {
    images: isPiano()
      ? [
          require('../Assets/piano1.png'),
          require('../Assets/piano2.png'),
          require('../Assets/piano3.png'),
        ]
      : [
          require('../Assets/art1.png'),
          require('../Assets/art2.png'),
          require('../Assets/art3.png'),
        ],
    title: isPiano() ? '피아노' : '미술',
    content: ['사용레슨 수', '현재 예약 레슨수', '예약 가능 레슨수'],
    cnt: [data.use, data.book, data.unused],
    color: isPiano() ? '#c78e4b' : '#ae6c6a',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../Assets/check.png')}
          style={styles.checkImage}
        />
        <Text style={styles.headerTitle}>{state.title} 예약정보</Text>
      </View>
      <View style={styles.body}>
        {state.images.map((image, idx) => (
          <View
            key={idx}
            style={[styles.bodyWrapper, idx !== 2 && styles.borderRight]}>
            <ImageBackground source={image} style={styles.infoWrapper}>
              <View style={[styles.count, {backgroundColor: state.color}]}>
                <Text style={styles.cnt}>{state.cnt[idx]}</Text>
              </View>
            </ImageBackground>
            <Text style={styles.infoTitle}>{state.content[idx]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkImage: {width: 20, height: 20},
  headerTitle: {
    color: '#686868',
    marginLeft: 5,
    marginBottom: -3,
    fontWeight: 'bold',
  },
  body: {flexDirection: 'row', paddingTop: 10},
  cnt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoTitle: {
    color: '#888888',
    fontSize: 12,
    marginTop: 5,
  },
  bodyWrapper: {
    flex: 1,
    padding: 10,
    borderColor: '#dadada',
    alignItems: 'center',
  },
  borderRight: {
    borderRightWidth: 0.5,
  },
  infoWrapper: {
    width: 60,
    height: 60,
  },
  count: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 50,
    padding: 5,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
