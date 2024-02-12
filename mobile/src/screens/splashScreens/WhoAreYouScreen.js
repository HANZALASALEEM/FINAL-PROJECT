import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLOR from '../../assets/color/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ForwordButton from '../../components/ForwordButton';
import {useNavigation} from '@react-navigation/native';
const WhoAreYouScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* 30% For Heading Container */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>WHO ARE YOU?</Text>
      </View>

      {/* 10% For Forword Button Container */}
      <View style={styles.buttonContainer}>
        <ForwordButton title={'STUDENT'} />
      </View>

      {/* 10% For Forword Button Container */}
      <View style={styles.buttonContainer}>
        <ForwordButton
          title={'TEACHER'}
          onPressButton={() => navigation.navigate('TeacherLoginScreen')}
        />
      </View>

      {/* 10% For Forword Button Container */}
      <View style={styles.buttonContainer}>
        <ForwordButton title={'ADMINISTRATOR'} />
      </View>

      {/* 10% For Forword Button Container */}
      <View style={styles.buttonContainer}>
        <ForwordButton title={'GUEST'} />
      </View>
    </View>
  );
};

export default WhoAreYouScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  headingContainer: {
    height: hp('30%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    color: COLOR.blue,
    fontFamily: 'times new roman',
  },
  buttonContainer: {
    height: hp('10%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
