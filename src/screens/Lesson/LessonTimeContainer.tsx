import React, {useContext, useState} from 'react';
import LessonTimePresenter from './LessonTimePresenter';
import LessonContext from '../../Components/context/LessonContext';
import Loading from '../../Components/Loading';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const {
    times,
    teachers,
    type,
    timesLoading,
    teachersLoading,
    getTimes,
    getTeachers,
    selectedPayment,
  } = useContext(LessonContext);
  const [refresh, setRefresh] = useState(false);

  const isReady = !timesLoading && !teachersLoading;

  const onRefresh = () => {
    setRefresh(true);
    getTimes();
    setRefresh(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTeachers(selectedPayment);
      getTimes(selectedPayment);
    });

    return unsubscribe;
  }, [navigation]);

  return isReady ? (
    <LessonTimePresenter
      navigation={navigation}
      teachers={teachers}
      times={times}
      academyType={type}
      getTimes={getTimes}
      refresh={refresh}
      onRefresh={onRefresh}
      params={selectedPayment}
    />
  ) : (
    <Loading />
  );
};
