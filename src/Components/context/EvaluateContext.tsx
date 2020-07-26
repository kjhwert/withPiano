import React, {createContext, useContext, useState} from 'react';
import {lesson as lessonApi, lesson} from '../api';
import UserContext from './UserContext';

const EvaluateContext = createContext({});

export const EvaluateConTextProvider = ({children}) => {
  const {user} = useContext(UserContext);
  const [index, setIndex] = useState(null);
  const [show, setShow] = useState(null);
  const [indexLoading, setIndexLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  const getIndex = async () => {
    setIndexLoading(true);
    const {
      data: {list},
    } = await lesson.taken(user);
    setIndex(list);
    setIndexLoading(false);
  };

  const getShow = (lesson: Object) => {
    setShowLoading(true);
    setShow(lesson);
    setShowLoading(false);
  };

  const saveEvaluate = async (data) => {
    try {
      const result = await lessonApi.eval(data, user);
      await getIndex();
      return result;
    } catch (e) {
      return e.response;
    }
  };

  return (
    <EvaluateContext.Provider
      value={{
        index,
        show,
        indexLoading,
        showLoading,
        getIndex,
        getShow,
        saveEvaluate,
      }}>
      {children}
    </EvaluateContext.Provider>
  );
};

export default EvaluateContext;
