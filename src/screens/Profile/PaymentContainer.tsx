import React, {useContext, useEffect, useState} from 'react';
import PaymentPresenter from './PaymentPresenter';
import UserContext from '../../Components/context/UserContext';
import {payment} from '../../Components/api';
import {IUser} from '../../Components/types/User';

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  const {user} = useContext(UserContext);
  const [payments, setPayments] = useState([]);

  const getPayments = async (user: IUser) => {
    const result = await payment.payments(user);
    setPayments(result);
  };

  useEffect(() => {
    getPayments(user);
  }, []);

  return <PaymentPresenter navigation={navigation} payments={payments} />;
};
