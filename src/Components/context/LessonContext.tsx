import React, {createContext, useContext, useState} from 'react';
import {lesson, payment} from '../api';
import UserContext from './UserContext';

const LessonContext = createContext({});

export const LessonContextProvider = ({children}) => {
  const {user} = useContext(UserContext);
  const [index, setIndex] = useState(null);
  const [indexLoading, setIndexLoading] = useState(true);
  const [times, setTimes] = useState(null);
  const [timesLoading, setTimesLoading] = useState(true);
  const [teachers, setTeachers] = useState(null);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [type, setType] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const getIndex = async () => {
    setIndexLoading(true);
    let data = await payment.payments(user);
    data = data.filter((item) => {
      return item.state === '수강중';
    });
    setIndex(data);
    setIndexLoading(false);
  };

  const getTimes = async () => {
    setTimesLoading(true);

    if (selectedPayment === null) {
      return;
    }
    const {data} = await lesson.reservable(user, type, selectedPayment);
    const weeks = ['이번주', '다음주', '2주후', '3주후'];
    const weekNum = Object.keys(data);

    let result = Object.values(data);
    result = result.map((item, idx) => {
      item.id = idx;
      item.title = weeks[idx];

      const weekNumber = Number(weekNum[idx].substring(4, 6));
      const year = Number(weekNum[idx].substring(0, 4));

      let availableTeachers = [1, 2, 3, 4, 5, 6, 7]
        .map((i) => {
          if (typeof item[i] === 'object') {
            let arr = Object.values(item[i]);
            arr = arr.flat();
            return Array.from(new Set(arr));
          }
        })
        .flat();

      availableTeachers = availableTeachers.filter(
        (item, index) =>
          availableTeachers.indexOf(item) === index &&
          item !== undefined &&
          typeof item !== 'string',
      );

      item.availableTeachers = availableTeachers;

      item.year = year;
      item.weeks = getDateArray(weekNumber, year);
      return item;
    });

    setTimes(result);
    setTimesLoading(false);
  };

  const getTeachers = async () => {
    setTeachersLoading(true);

    const {data} = await lesson.teacher(user, selectedPayment);
    const result = data.filter((teacher) => teacher.academyType === type);
    setTeachers(result);
    setTeachersLoading(false);
  };

  const reserve = async (data) => {
    try {
      const result = await lesson.reserve(user, data);
      return result;
    } catch (e) {
      return e.response;
    }
  };

  const changeType = (typed: string) => {
    setType(typed);
  };

  const onChangePayment = (payment) => {
    setSelectedPayment(payment);
  };

  const getDateArray = (week: number, year: number) => {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    let ISOweekStart = simple;
    if (dow <= 4) {
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }

    let result = [];

    for (let i = 0; i <= 6; i++) {
      const d = new Date(ISOweekStart);

      d.setDate(d.getDate() + i);

      const day = getDay(d);
      const month = getMonth(d);

      result.push(`${month}/${day}`);
    }

    return result;
  };

  const getDay = (d: Date) => {
    return d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
  };

  const getMonth = (d: Date) => {
    return d.getMonth() + 1 < 10
      ? `0${d.getMonth() + 1}`
      : `${d.getMonth() + 1}`;
  };

  return (
    <LessonContext.Provider
      value={{
        index,
        indexLoading,
        times,
        timesLoading,
        teachers,
        teachersLoading,
        type,
        selectedPayment,
        getIndex,
        getTimes,
        getTeachers,
        changeType,
        reserve,
        onChangePayment,
      }}>
      {children}
    </LessonContext.Provider>
  );
};

export default LessonContext;
