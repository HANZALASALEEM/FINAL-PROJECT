import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Navbar from '../../../components/Navbar';
import COLOR from '../../../assets/color/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import SubmitButton from '../../../components/SubmitButton';
const HifzDailyReportDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const [sabaqStatus, setSabaqStatus] = useState(0);
  const [sabaqiStatus, setSabaqiStatus] = useState(0);
  const [manzilStatus, setManzilStatus] = useState(0);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={data.name}
        leftIcon={require('../../../assets/icons/left-arrow.png')}
        rightIcon={require('../../../assets/images/suffah-mono.png')}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        onPressRightIcon={() => {
          console.log('SUFFAH LOGO');
        }}
      />
      <Text style={styles.heading}>DAILY REPORT</Text>
      <View style={styles.reportContainer}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            setSabaqStatus(-1);
          }}>
          <Text style={[styles.title, {color: COLOR.red}]}>کمزور</Text>
          <Image
            source={
              sabaqStatus == -1
                ? require('../../../assets/icons/radio-red-fill.png')
                : require('../../../assets/icons/radio-red-outline.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            setSabaqStatus(1);
          }}>
          <Text style={[styles.title, {color: COLOR.green}]}>بہتر</Text>
          <Image
            source={
              sabaqStatus == 1
                ? require('../../../assets/icons/radio-green-fill.png')
                : require('../../../assets/icons/radio-green-outline.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            onChangeText={text => {}}
            keyboardType="numeric"
          />
          <Text style={[styles.title, {color: COLOR.blue, marginLeft: 5}]}>
            لائنوں کی مقدار
          </Text>
        </View>
        <Text
          style={[
            styles.title,
            {
              color: COLOR.blue,
              marginLeft: 5,
              fontWeight: 'bold',
              fontSize: 18,
            },
          ]}>
          سبق
        </Text>
      </View>
      <View style={styles.reportContainer}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            setSabaqiStatus(-1);
          }}>
          <Text style={[styles.title, {color: COLOR.red}]}>کمزور</Text>
          <Image
            source={
              sabaqiStatus == -1
                ? require('../../../assets/icons/radio-red-fill.png')
                : require('../../../assets/icons/radio-red-outline.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            setSabaqiStatus(1);
          }}>
          <Text style={[styles.title, {color: COLOR.green}]}>بہتر</Text>
          <Image
            source={
              sabaqiStatus == 1
                ? require('../../../assets/icons/radio-green-fill.png')
                : require('../../../assets/icons/radio-green-outline.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            onChangeText={text => {}}
            keyboardType="numeric"
          />
          <Text style={[styles.title, {color: COLOR.blue, marginLeft: 5}]}>
            پارہ نمبر
          </Text>
        </View>
        <Text
          style={[
            styles.title,
            {
              color: COLOR.blue,
              marginLeft: 5,
              fontWeight: 'bold',
              fontSize: 18,
            },
          ]}>
          سبقی
        </Text>
      </View>
      <View style={styles.reportContainer}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            setManzilStatus(-1);
          }}>
          <Text style={[styles.title, {color: COLOR.red}]}>کمزور</Text>
          <Image
            source={
              manzilStatus == -1
                ? require('../../../assets/icons/radio-red-fill.png')
                : require('../../../assets/icons/radio-red-outline.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            setManzilStatus(1);
          }}>
          <Text style={[styles.title, {color: COLOR.green}]}>بہتر</Text>
          <Image
            source={
              manzilStatus == 1
                ? require('../../../assets/icons/radio-green-fill.png')
                : require('../../../assets/icons/radio-green-outline.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={styles.input}
            onChangeText={text => {}}
            keyboardType="numeric"
          />
          <Text style={[styles.title, {color: COLOR.blue, marginLeft: 5}]}>
            پارہ نمبر
          </Text>
        </View>
        <Text
          style={[
            styles.title,
            {
              color: COLOR.blue,
              marginLeft: 5,
              fontWeight: 'bold',
              fontSize: 18,
            },
          ]}>
          منزل
        </Text>
      </View>
      <SubmitButton title={'SUBMIT'} />
    </View>
  );
};

export default HifzDailyReportDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  heading: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: {width: 2, height: 2}, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
    marginHorizontal: 20,
    marginVertical: 10,
  },
  reportContainer: {
    height: 50,
    width: wp('95%'),
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: COLOR.black, // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7, // Shadow opacity (0 to 1)
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5,
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    marginVertical: 10,
  },
  title: {
    //fontFamily: 'NotoNastaliqUrdu-Bold',
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    height: 45,
    width: 60,
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
  },
});
