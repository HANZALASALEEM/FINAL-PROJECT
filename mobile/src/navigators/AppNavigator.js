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
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
