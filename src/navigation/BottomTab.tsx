import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabHeader from '../Components/BottomTabHeader';
import NewsStack from './NewsStack';
import LessonStack from './LessonStack';
import BookStack from './BookStack';
import EvaluateStack from './EvaluateStack';
import NoticeStack from './NoticeStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

export default ({route}) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabHeader {...props} />}
      initialRouteName={route.name}>
      <Tab.Screen name="새소식" component={NewsStack} />
      <Tab.Screen name="내정보" component={ProfileStack} />
      <Tab.Screen name="레슨예약" component={LessonStack} />
      <Tab.Screen name="예약내역" component={BookStack} />
      <Tab.Screen name="레슨평가" component={EvaluateStack} />
      <Tab.Screen name="알림" component={NoticeStack} />
    </Tab.Navigator>
  );
};
