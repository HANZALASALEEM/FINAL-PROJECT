import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../assets/color/Color';
const Navbar = ({
  onPressLeftIcon,
  leftIcon,
  title,
  onPressRightIcon,
  rightIcon,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPressLeftIcon();
        }}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          onPressRightIcon();
        }}>
        <Image source={rightIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: wp('100%'),
    backgroundColor: COLOR.blue,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  icon: {
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 18,
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
  },
});
