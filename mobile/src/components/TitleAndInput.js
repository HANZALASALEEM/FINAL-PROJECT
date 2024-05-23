import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import COLOR from '../assets/color/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const TitleAndInput = ({icon, title, placeholder, value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconAndTitleContainer}>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        value={value}
        onChangeText={text => {
          onChangeText(text);
        }}
      />
    </View>
  );
};

export default TitleAndInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  iconAndTitleContainer: {
    width: wp('90%'),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 14,
    color: COLOR.blue,
    fontFamily: 'times new roman',
    marginLeft: 5,
  },
  input: {
    height: 50,
    width: wp('90%'),
    borderWidth: 0.5,
    alignSelf: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 15,
    borderColor: COLOR.gray,
    shadowColor: COLOR.lightBlue, // Shadow color
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.7, // Shadow opacity (0 to 1)
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5,
    color: 'gray',
    paddingHorizontal: 15,
  },
});
