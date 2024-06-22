import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreens/SplashScreen';
import OnBoardingScreen1 from '../screens/splashScreens/OnBoardingScreen1';
import OnBoardingScreen2 from '../screens/splashScreens/OnBoardingScreen2';
import OnBoardingScreen3 from '../screens/splashScreens/OnBoardingScreen3';
import WhoAreYouScreen from '../screens/splashScreens/WhoAreYouScreen';
import TeacherLoginScreen from '../screens/loginScreens/TeacherLoginScreen';
import TeacherBottomNavigator from './TeacherBottomNavigator';
import StudentNotification from '../screens/studentBottomTabs/StudentNotification';
import NotificationViewScreen from '../screens/NotificationViewScreen';
import StudentEvent from '../screens/studentBottomTabs/StudentEvent';
import EventViewScreen from '../screens/EventViewScreen';
import HomeworkScreen from '../screens/teacherBottomTabs/extraScreens/HomeworkScreen';
import TestReportScreen from '../screens/teacherBottomTabs/extraScreens/TestReportScreen';
import StudyStatusScreen from '../screens/teacherBottomTabs/extraScreens/StudyStatusScreen';
import StudyStatusDetailScreen from '../screens/teacherBottomTabs/extraScreens/StudyStatusDetailScreen';
import HifzDailyReportScreen from '../screens/teacherBottomTabs/extraScreens/HifzDailyReportScreen';
import HifzDailyReportDetailScreen from '../screens/teacherBottomTabs/extraScreens/HifzDailyReportDetailScreen';
import HifzTestReportScreen from '../screens/teacherBottomTabs/extraScreens/HifzTestReportScreen';
import StudentLoginScreen from '../screens/loginScreens/StudentLoginScreen';
import StudentBottomNavigator from './StudentBottomNavigator';
import StudentAttendence from '../screens/studentBottomTabs/extraScreens/StudentAttendence';
import StudentComplaint from '../screens/studentBottomTabs/extraScreens/StudentComplaint';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoardingScreen1"
        component={OnBoardingScreen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoardingScreen2"
        component={OnBoardingScreen2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoardingScreen3"
        component={OnBoardingScreen3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WhoAreYouScreen"
        component={WhoAreYouScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TeacherLoginScreen"
        component={TeacherLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TeacherBottomNavigator"
        component={TeacherBottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudentNotification"
        component={StudentNotification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudentEvent"
        component={StudentEvent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationViewScreen"
        component={NotificationViewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventViewScreen"
        component={EventViewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeworkScreen"
        component={HomeworkScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TestReportScreen"
        component={TestReportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudyStatusScreen"
        component={StudyStatusScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudyStatusDetailScreen"
        component={StudyStatusDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HifzDailyReportScreen"
        component={HifzDailyReportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HifzDailyReportDetailScreen"
        component={HifzDailyReportDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HifzTestReportScreen"
        component={HifzTestReportScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudentLoginScreen"
        component={StudentLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudentBottomNavigator"
        component={StudentBottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudentAttendence"
        component={StudentAttendence}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudentComplaint"
        component={StudentComplaint}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
