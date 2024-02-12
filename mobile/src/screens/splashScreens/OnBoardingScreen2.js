import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import COLOR from '../../assets/color/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ForwordButton from '../../components/ForwordButton';
import {useNavigation} from '@react-navigation/native';
const OnBoardingScreen2 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" />
      {/* 10% height of Skip Button */}
      <View style={styles.skipButtonContainer}>
        {/* <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonTitle}>SKIP</Text>
        </TouchableOpacity> */}
      </View>
      {/* 50% height of Image Container */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/onBoarding2.png')}
        />
      </View>
      {/* 10% height of Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>GET NOTIFICATIONS</Text>
      </View>
      {/* 10% height of Forword Button */}
      <View style={styles.forwordButtonContainer}>
        <ForwordButton
          title={'GO FORWORD'}
          onPressButton={() => navigation.navigate('OnBoardingScreen3')}
        />
      </View>
    </View>
  );
};

export default OnBoardingScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  skipButtonContainer: {
    height: hp('10%'),
    width: wp('100%'),
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  skipButton: {},
  skipButtonTitle: {
    fontFamily: 'times new roman',
    fontSize: 20,
    color: COLOR.lightBlue,
  },
  imageContainer: {
    height: hp('50%'),
    width: wp('100%'),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  headingContainer: {
    height: hp('10%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'times new roman',
    fontSize: 28,
    color: COLOR.lightBlue,
  },
  forwordButtonContainer: {
    height: hp('10%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
