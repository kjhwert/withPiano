import React, {useCallback, useContext, useEffect, useState} from 'react';
import BookPresenter from './BookPresenter';
import Loading from '../../Components/Loading';
import BookContext from '../../Components/context/BookContext';

export default ({navigation}) => {
  const {index, indexLoading, getIndex, cancel} = useContext(BookContext);
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
    <BookPresenter
      reserved={index}
      cancel={cancel}
      refresh={refresh}
      onRefresh={onRefresh}
    />
  ) : (
    <Loading />
  );
};
