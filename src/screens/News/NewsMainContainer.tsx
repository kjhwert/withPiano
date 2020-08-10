import React, {useEffect, useState} from 'react';
import NewsMainPresenter from './NewsMainPresenter';
import {news} from '../../Components/api';
import Loading from '../../Components/Loading';
import NoticeMainPresenter from '../Notice/NoticeMainPresenter';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const [state, setState] = useState(null);

  const getNews = async () => {
    const {data} = await news.index();
    setState(data);
  };

  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    getNews();
    setRefresh(false);
  };

  useEffect(() => {
    getNews();
  }, []);

  return state ? (
    <NewsMainPresenter
      navigation={navigation}
      news={state}
      refresh={refresh}
      onRefresh={onRefresh}
    />
  ) : (
    <Loading />
  );
};
