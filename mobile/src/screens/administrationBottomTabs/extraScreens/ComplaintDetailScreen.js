import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import React from 'react';
import COLOR from '../../../assets/color/Color';
import Navbar from '../../../components/Navbar';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const ComplaintDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const complaintData = route.params.data;
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={complaintData.studentName}
        leftIcon={require('../../../assets/icons/left-arrow.png')}
        onPressLeftIcon={() => navigation.goBack()}
        onPressRightIcon={() => {
          console.log('Right Icon Pressed');
        }}
      />

      {/* 10% for Date Container */}
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{complaintData.date}</Text>
      </View>
      {/* Notification Container */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notification}>{complaintData.complaint}</Text>
      </View>
    </ScrollView>
  );
};

export default ComplaintDetailScreen;

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
