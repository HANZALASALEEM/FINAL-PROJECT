import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('OnBoardingScreen1');
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0077b6" />
      <LinearGradient
        start={{x: 0.5, y: 0}}
        end={{x: 0, y: 0.5}}
        colors={['#0077b6', '#91D9FF']}
        style={styles.linearGradient}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/suffah-logo.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  imageContainer: {
    paddingRight: 35,
  },
  image: {
    width: 290,
    height: 400,
  },
});
