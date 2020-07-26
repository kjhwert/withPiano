import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default ({navigation}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.openDrawer();
      }}>
      <Image source={require('../Assets/menu.png')} style={{marginRight: 10}} />
    </TouchableOpacity>
  );
};
