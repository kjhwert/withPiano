import React from 'react';
import NewsBranchMainPresenter from './NewsBranchMainPresenter';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  return <NewsBranchMainPresenter navigation={navigation} />;
};
