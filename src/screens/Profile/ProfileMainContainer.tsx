import React, {useContext, useEffect, useState} from 'react';
import ProfileMainPresenter from './ProfileMainPresenter';
import UserContext from '../../Components/context/UserContext';
import {userApi} from '../../Components/api';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const {user} = useContext(UserContext);
  const [state, setState] = useState(null);

  const getUserInfo = async () => {
    const {data} = await userApi.info(user);
    setState(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return state && <ProfileMainPresenter navigation={navigation} user={state} />;
};
