import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import COLOR from '../assets/color/Color';

const ForwordButton = ({onPressButton, title}) => {
  return (
    <LinearGradient
      colors={[COLOR.white, COLOR.lightBlue]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            onPressButton();
          }}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/right-arrow.png')}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ForwordButton;

const styles = StyleSheet.create({
  gradient: {
    height: 60,
    width: 300,
    borderRadius: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 5,
    paddingLeft: 50,
  },
  title: {
    color: COLOR.blue,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'times new roman',
  },
  buttonContainer: {
    height: 55,
    width: 55,
    backgroundColor: COLOR.blue,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
