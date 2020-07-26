import React, {useContext, useEffect, useState} from 'react';
import EvaluateMainPresenter from './EvaluateMainPresenter';
import EvaluateContext from '../../Components/context/EvaluateContext';
import Loading from '../../Components/Loading';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const {index, getIndex, indexLoading} = useContext(EvaluateContext);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    getIndex();
    setRefresh(false);
  };

  useEffect(() => {
    getIndex();
  }, []);

  return !indexLoading ? (
    <EvaluateMainPresenter
      lessons={index}
      navigation={navigation}
      refresh={refresh}
      onRefresh={onRefresh}
    />
  ) : (
    <Loading />
  );
};
