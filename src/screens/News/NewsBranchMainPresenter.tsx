import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const [items] = useState([
    {
      branch: '남포점',
      title: '신규오픈 파격할인 이벤트',
      read: 0,
    },
    {
      branch: '남포점',
      title: '신규오픈 파격할인 이벤트',
      read: 1,
    },
  ]);

  return (
    <View style={styles.container}>
      {items.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.wrapper}
          onPress={() => {
            navigation.navigate('detail', 1);
          }}>
          <View
            style={[
              styles.branchWrapper,
              !item.read ? styles.readBack : styles.unReadBack,
            ]}>
            <Text
              style={[
                styles.branch,
                !item.read ? styles.readColor : styles.unReadColor,
              ]}>
              {item.branch}
            </Text>
          </View>
          <View style={styles.newsWrapper}>
            <Text style={styles.title}>{item.title}</Text>
            <Image
              source={require('../../Assets/arrow-gray.png')}
              style={styles.arrowImage}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 15,
    padding: 10,
  },
  wrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  branchWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
  branch: {
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 14,
  },
  newsWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#686868',
    height: 20,
    marginLeft: 20,
    marginTop: 5,
  },
  arrowImage: {width: 12, height: 12, marginRight: 10},
  readBack: {backgroundColor: '#fac560'},
  unReadBack: {backgroundColor: '#dadada'},
  readColor: {color: 'white'},
  unReadColor: {color: '#333333'},
});
