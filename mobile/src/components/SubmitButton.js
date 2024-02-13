import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../assets/color/Color';
const SubmitButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: COLOR.blue,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLOR.lightBlue, // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7, // Shadow opacity (0 to 1)
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5,
  },

  text: {
    fontFamily: 'times new roman',
    fontSize: 20,
    color: COLOR.lightBlue,
  },
});
