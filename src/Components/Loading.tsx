import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/loading.gif')}
        style={styles.loadingImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 30,
    height: 30,
  },
});
