import React from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {IPayment} from '../../Components/types/Payment';
import LessonMain from '../../Components/LessonMain';

interface IProps {
  navigation: any;
  data: Array<IPayment>;
  changeType: Function;
  refresh: boolean;
  onRefresh: Function;
}

export default ({navigation, data, refresh, onRefresh}: IProps) => {
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      {data.map((data, idx) => (
        <LessonMain data={data} key={idx} navigation={navigation} />
      ))}
      <View style={{height: 60}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 0,
    padding: 10,
  },
});
