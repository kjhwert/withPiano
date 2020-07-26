import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LessonMainContainer from '../screens/Lesson/LessonMainContainer';
import LessonTimeContainer from '../screens/Lesson/LessonTimeContainer';
import Menu from '../Components/Menu';
import {LessonContextProvider} from '../Components/context/LessonContext';

const Stack = createStackNavigator();

interface IProps {
  navigation: any;
}

export default ({navigation}: IProps) => {
  return (
    <LessonContextProvider>
      <Stack.Navigator
        initialRouteName="reservation"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
            borderBottomColor: 'black',
            shadowColor: 'black',
          },
          headerTintColor: 'white',
          animationEnabled: false,
          headerBackTitleVisible: false,
          headerRight: () => {
            return <Menu navigation={navigation} />;
          },
        }}>
        <Stack.Screen
          options={{
            headerTitle: '레슨 예약',
          }}
          name="reservation"
          component={LessonMainContainer}
        />
        <Stack.Screen
          options={{
            headerTitle: '날짜/시간 선택',
          }}
          name="time"
          component={LessonTimeContainer}
        />
      </Stack.Navigator>
    </LessonContextProvider>
  );
};
