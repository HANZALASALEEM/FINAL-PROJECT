import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import COLOR from '../assets/color/Color';

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
        value={value}
        onChangeText={() => {
          onChangeText();
        }}
      />
    </View>
  );
};

export default TitleAndInput;

const styles = StyleSheet.create({
  container: {},
  iconAndTitleContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 14,
    color: COLOR.blue,
    fontFamily: 'times new roman',
  },
});
