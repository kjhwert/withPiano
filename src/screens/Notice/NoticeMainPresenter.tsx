import React, {useState} from 'react';
import {Image, StyleSheet, Switch, Text, View} from 'react-native';

export default () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const items = [
    {
      regDate: '2020-06-18',
      title: '신규오픈 파격할인 이벤트 ...',
      read: 0,
    },
    {
      regDate: '2020-06-17',
      title: '신규오픈 파격할인 이벤트 ...',
      read: 1,
    },
    {
      regDate: '2020-06-18',
      title: '신규오픈 파격할인 이벤트 ...',
      read: 1,
    },
  ];

  const isRead = (read: number) => {
    return read ? styles.read : styles.unRead;
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>알림설정</Text>
        <Switch
          trackColor={{false: '#767577', true: '#fac560'}}
          thumbColor={isEnabled ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#767577"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {items.map((item, idx) => (
        <View key={idx} style={styles.noticeWrapper}>
          <View style={[styles.noticeDateWrapper, isRead(item.read)]}>
            <Text style={styles.noticeDate}>{item.regDate}</Text>
          </View>
          <View style={styles.noticeContent}>
            <Image
              source={require('../../Assets/bell.png')}
              style={styles.noticeImage}
            />
            <View style={styles.noticeTitleWrapper}>
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Image
                source={require('../../Assets/arrow-gray.png')}
                style={styles.arrowImage}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 30,
  },
  settingText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  noticeWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
  },
  noticeDate: {
    color: '#666666',
    fontSize: 11,
  },
  noticeContent: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  noticeImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  noticeDateWrapper: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  noticeTitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noticeTitle: {
    color: '#686868',
  },
  arrowImage: {
    width: 10,
    height: 10,
  },
  read: {
    backgroundColor: '#cccccc',
  },
  unRead: {
    backgroundColor: '#fac560',
  },
});
