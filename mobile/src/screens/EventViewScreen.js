import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import COLOR from '../assets/color/Color';
import Navbar from '../components/Navbar';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const EventViewScreen = ({route}) => {
  const navigation = useNavigation();
  const eventData = route.params.data;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'EVENT DETAIL'}
        leftIcon={require('../assets/icons/left-arrow.png')}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={styles.bannerImageContainer}>
        <Image source={{uri: eventData.image}} style={styles.bannerImage} />
      </View>
      <View style={{flex: 1}}>
        <ScrollView style={styles.playgroundContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>{eventData.title.toUpperCase()}</Text>
            <Text style={styles.date}>
              {eventData.date.toDate().toDateString().toUpperCase()}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{eventData.event}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EventViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  bannerImageContainer: {
    height: hp('30%'),
    width: wp('100%'),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    shadowColor: COLOR.lightBlue, // Shadow color
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 3, // Shadow blur radius
    elevation: 5,
    zIndex: 1,
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  playgroundContainer: {
    flex: 1,
    width: wp('100%'),

    marginTop: -50,
  },
  headingContainer: {
    height: hp('20%'),
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  heading: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: {width: 2, height: 2}, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
    marginVertical: 10,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  date: {
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 14,
  },
  descriptionContainer: {
    // height: hp('50%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  description: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 14,
    textAlign: 'justify',
  },
});
