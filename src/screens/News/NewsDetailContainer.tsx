import React, {useEffect, useState} from 'react';
import NewsDetailPresenter from './NewsDetailPresenter';
import {news} from '../../Components/api';
import Loading from '../../Components/Loading';

export default ({route}) => {
  const [state, setState] = useState(null);

  const getShow = async () => {
    const {data} = await news.show(route.params);
    setState(data[0]);
  };

  useEffect(() => {
    getShow();
  }, []);

  return state ? <NewsDetailPresenter news={state} /> : <Loading />;
};
