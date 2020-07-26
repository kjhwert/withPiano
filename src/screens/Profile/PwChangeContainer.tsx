import React from 'react';
import PwChangePresenter from './PwChangePresenter';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  return <PwChangePresenter navigation={navigation} />;
};
