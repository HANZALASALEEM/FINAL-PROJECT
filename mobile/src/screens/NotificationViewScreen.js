import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import React from 'react';
import COLOR from '../assets/color/Color';
import Navbar from '../components/Navbar';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const NotificationViewScreen = ({route}) => {
  const navigation = useNavigation();
  const notificationData = route.params.data;
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'NOTIFICATION'}
        leftIcon={require('../assets/icons/left-arrow.png')}
        onPressLeftIcon={() => navigation.goBack()}
      />

      {/* 10% for Date Container */}
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {notificationData.date.toDate().toDateString().toUpperCase()}
        </Text>
      </View>
      {/* Notification Container */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notification}>{notificationData.notification}</Text>
      </View>
    </ScrollView>
  );
};

export default NotificationViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  dateContainer: {
    height: hp('10%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 20,
  },
  notificationContainer: {
    width: wp('93%'),
    alignSelf: 'center',
  },
  notification: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 16,
    textAlign: 'justify',
  },
});
