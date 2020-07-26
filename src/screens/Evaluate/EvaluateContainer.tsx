import React, {useContext} from 'react';
import EvaluatePresenter from './EvaluatePresenter';
import EvaluateContext from '../../Components/context/EvaluateContext';
import Loading from '../../Components/Loading';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const {show, showLoading} = useContext(EvaluateContext);

  return !showLoading ? (
    <EvaluatePresenter navigation={navigation} lesson={show} />
  ) : (
    <Loading />
  );
};
