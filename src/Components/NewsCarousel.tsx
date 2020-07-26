import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import {INews} from './types/News';
const {width: deviceWidth} = Dimensions.get('window');

interface IProps {
  data: Array<INews>;
  navigation: any;
}

export default ({data, navigation}: IProps) => {
  const [active, setActive] = useState(0);
  const scrollViewRef = useRef(null);

  const activeChange = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    setActive(slide);
  };

  const moveScroll = (moveNum: number) => {
    const scroll = active + moveNum;

    let result = 0;
    switch (scroll) {
      case -1:
        result = deviceWidth * data.length;
        break;
      case data.length:
        result = 0;
        break;
      default:
        result = deviceWidth * scroll;
        break;
    }

    scrollViewRef.current.scrollTo({x: result});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftBtn}
        onPress={() => {
          moveScroll(-1);
        }}>
        <Image
          source={require('../Assets/arrow.png')}
          style={styles.leftImage}
        />
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        pagingEnabled
        onScroll={activeChange}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        ref={scrollViewRef}>
        {data.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              navigation.navigate('detail', item.id);
            }}>
            {item.imgUrl && (
              <Image
                source={{uri: item.imgUrl}}
                style={styles.bannerImage}
                key={idx}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.rightBtn}
        onPress={() => {
          moveScroll(1);
        }}>
        <Image
          source={require('../Assets/arrow.png')}
          style={styles.rightImage}
        />
      </TouchableOpacity>
      <View style={styles.pagination}>
        {data.map((item, idx) => (
          <Text
            style={[
              styles.page,
              active === idx ? {color: '#fac560'} : {color: 'white'},
            ]}
            key={idx}>
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftBtn: {
    position: 'absolute',
    left: 10,
    top: 90,
    zIndex: 10,
  },
  leftImage: {
    transform: [{rotate: '180deg'}],
    width: 20,
    height: 20,
  },
  bannerImage: {width: deviceWidth, height: 200, resizeMode: 'cover'},
  rightBtn: {position: 'absolute', right: 10, top: 90, zIndex: 10},
  rightImage: {
    width: 20,
    height: 20,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 5,
  },
  page: {marginRight: 3},
});
