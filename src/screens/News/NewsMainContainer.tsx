import React, {useEffect, useState} from 'react';
import NewsMainPresenter from './NewsMainPresenter';
import {news} from '../../Components/api';
import Loading from '../../Components/Loading';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const [state, setState] = useState(null);

  const getNews = async () => {
    const {data} = await news.index();
    setState(data);
  };

  useEffect(() => {
    getNews();
  }, []);

  return state ? (
    <NewsMainPresenter navigation={navigation} news={state} />
  ) : (
    <Loading />
  );
};
