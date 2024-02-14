import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TeacherHome from '../screens/teacherBottomTabs/TeacherHome';
import TeacherAttandence from '../screens/teacherBottomTabs/TeacherAttandence';
import COLOR from '../assets/color/Color';
import TeacherEducation from '../screens/teacherBottomTabs/TeacherEducation';
import TeacherHifz from '../screens/teacherBottomTabs/TeacherHifz';

const Tab = createBottomTabNavigator();
const TeacherBottomNavigator = ({route}) => {
  const {data} = route.params;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLOR.white,
        tabBarInactiveTintColor: COLOR.lightBlue,
        tabBarStyle: {
          display: 'flex',
          backgroundColor: COLOR.blue,
          borderRadius: 30,
          marginHorizontal: 5,
          bottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14, // Adjust the font size as needed
          display: 'none',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={TeacherHome}
        initialParams={{data}} // Pass data as initial params
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Text style={styles.tabText}>HOME</Text>
            ) : (
              <Image
                source={require('../assets/icons/home.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={TeacherAttandence}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Text style={styles.tabText}>ATTENDANCE</Text>
            ) : (
              <Image
                source={require('../assets/icons/attendance.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Education"
        component={TeacherEducation}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Text style={styles.tabText}>EDUCATION</Text>
            ) : (
              <Image
                source={require('../assets/icons/education.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Hifz"
        component={TeacherHifz}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return focused ? (
              <Text style={styles.tabText}>QURAN</Text>
            ) : (
              <Image
                source={require('../assets/icons/hifz.png')}
                style={[styles.icon, {tintColor: color}]}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TeacherBottomNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  tabText: {
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 9,
  },
});
