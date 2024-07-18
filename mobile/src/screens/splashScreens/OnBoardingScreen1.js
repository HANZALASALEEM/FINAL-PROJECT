import {
  Image,
  ScrollView,
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
const OnBoardingScreen1 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" />
      <ScrollView>
        {/* 10% height of Skip Button */}
        <View style={styles.skipButtonContainer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('WhoAreYouScreen')}>
            <Text style={styles.skipButtonTitle}>SKIP</Text>
          </TouchableOpacity>
        </View>
        {/* 50% height of Image Container */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/onBoarding1.png')}
          />
        </View>
        {/* 10% height of Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>STUDY STATUS</Text>
        </View>
        {/* 10% height of Forword Button */}
        <View style={styles.forwordButtonContainer}>
          <ForwordButton
            title={'GO FORWORD'}
            onPressButton={() => navigation.navigate('OnBoardingScreen2')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OnBoardingScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    alignSelf: 'center',
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
    fontSize: 30,
    color: COLOR.lightBlue,
  },
  forwordButtonContainer: {
    height: hp('10%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
