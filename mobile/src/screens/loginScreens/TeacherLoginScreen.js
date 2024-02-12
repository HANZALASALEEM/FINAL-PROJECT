import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLOR from '../../assets/color/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import TitleAndInput from '../../components/TitleAndInput';
const TeacherLoginScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />

      {/* 30% For Banner */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerContainerHeading}>WELLCOME!</Text>
        <Text style={styles.bannerContainerTitle}>
          SIGN IN WITH PROVIDED TEACHER EMAIL
        </Text>
      </View>

      <View>
        <TitleAndInput />
      </View>
    </View>
  );
};

export default TeacherLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  bannerContainer: {
    height: hp('30%'),
    width: wp('100%'),
    backgroundColor: COLOR.blue,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    paddingLeft: 30,
  },
  bannerContainerHeading: {
    fontSize: 28,
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    marginBottom: 20,
  },
  bannerContainerTitle: {
    fontSize: 14,
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
  },
});
