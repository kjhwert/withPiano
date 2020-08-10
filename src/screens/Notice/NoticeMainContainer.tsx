import React, {useContext, useEffect, useState} from 'react';
import NoticeMainPresenter from './NoticeMainPresenter';
import UserContext from '../../Components/context/UserContext';
import {notice} from '../../Components/api';
import Loading from '../../Components/Loading';

export default () => {
  const {user} = useContext(UserContext);
  const [state, setState] = useState({
    data: [],
    loading: true,
  });
  const [refresh, setRefresh] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    getIndex();
    setRefresh(false);
  };

  const getIndex = async () => {
    const {data} = await notice.index(user);
    setState({data: data, loading: false});
  };

  useEffect(() => {
    getIndex();
  }, []);

  return state.loading ? (
    <Loading />
  ) : (
    <NoticeMainPresenter
      data={state.data}
      refresh={refresh}
      onRefresh={onRefresh}
    />
  );
};
