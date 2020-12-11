import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NewsCarousel from '../../Components/NewsCarousel';
import {INews} from '../../Components/types/News';

interface IProps {
  navigation: any;
  news: Array<INews>;
  refresh: boolean;
  onRefresh: any;
}

export default ({navigation, news, refresh, onRefresh}: IProps) => {
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <NewsCarousel data={news} navigation={navigation} />
      <View style={styles.notice}>
        <TouchableOpacity style={styles.branchContainer}>
          <Image
            source={require('../../Assets/check.png')}
            style={styles.checkBtn}
          />
          <Text style={styles.header}>지점 공지사항</Text>
        </TouchableOpacity>
        {news.map((item, idx) => (
          <View
            key={idx}
            style={
              news.length - 1 === idx
                ? {paddingTop: 15, padding: 10}
                : styles.newsContainer
            }>
            <TouchableOpacity
              style={styles.newsWrapper}
              onPress={() => {
                navigation.navigate('detail', item.id);
              }}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.regDate}>
                  {item.createTime.substring(0, 10)}
                </Text>
              </View>
              <Image
                source={require('../../Assets/arrow-gray.png')}
                style={{width: 10, height: 10}}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  notice: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
  },
  header: {
    fontSize: 16,
    color: '#686868',
  },
  title: {
    fontSize: 14,
    color: '#3c3c3c',
    marginBottom: 1,
  },
  regDate: {
    color: '#aeaeae',
    fontSize: 10,
  },
  newsWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  newsContainer: {
    paddingTop: 15,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d4d4d4',
  },
  checkBtn: {
    width: 15,
    height: 15,
    marginRight: 5,
    resizeMode: 'contain',
  },
  branchContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
});
