import React, {createContext, useContext, useEffect, useState} from 'react';
import {lesson} from '../api';
import UserContext from './UserContext';
import LessonContext from './LessonContext';

const BookContext = createContext({});

export const BookContextProvider = ({children}) => {
  const {user} = useContext(UserContext);
  const [index, setIndex] = useState(null);
  const [indexLoading, setIndexLoading] = useState(true);

  useEffect(() => {
    getIndex();
  }, []);

  const getIndex = async () => {
    setIndexLoading(true);
    const {
      data: {list},
    } = await lesson.reserved(user);
    setIndex(list);
    setIndexLoading(false);
  };

  const cancel = async (id: number) => {
    try {
      const result = await lesson.cancel(user, id);
      await getIndex();
      return result;
    } catch (e) {
      return e.response;
    }
  };

  return (
    <BookContext.Provider value={{index, indexLoading, getIndex, cancel}}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
