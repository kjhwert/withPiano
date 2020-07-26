import React, {useContext, useEffect, useState} from 'react';
import LessonMainPresenter from './LessonMainPresenter';
import LessonContext from '../../Components/context/LessonContext';
import Loading from '../../Components/Loading';
import BookPresenter from '../Book/BookPresenter';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const {index, getIndex, indexLoading} = useContext(LessonContext);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    getIndex();
    setRefresh(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getIndex();
    });

    return unsubscribe;
  }, [navigation]);

  return !indexLoading ? (
    <LessonMainPresenter
      navigation={navigation}
      data={index}
      refresh={refresh}
      onRefresh={onRefresh}
    />
  ) : (
    <Loading />
  );
};
