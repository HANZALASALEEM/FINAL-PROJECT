import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navbar from '../../../components/Navbar';
import COLOR from '../../../assets/color/Color';
import {collection, setDoc, doc} from 'firebase/firestore';
import {db} from '../../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import SubmitButton from '../../../components/SubmitButton';
const HifzDailyReportDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const [date, setDate] = useState('');
  const [sabaqStatus, setSabaqStatus] = useState(0);
  const [sabaqiStatus, setSabaqiStatus] = useState(0);
  const [manzilStatus, setManzilStatus] = useState(0);
  const [sabaqLines, setSabaqLines] = useState(0);
  const [sabaqiParaNumber, setSabaqiParaNumber] = useState(0);
  const [manzilParaNumber, setManzilParaNumber] = useState(0);

  const month_year = date.slice(0, 7);
  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1 and pad single digit months with a leading zero
      const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days with a leading zero
      return `${year}-${month}-${day}`;
    };

    setDate(getCurrentDate());
  }, []);

  const submitButton = async () => {
    if (!date) {
      // Show an alert to enter the date if it's not available
      Alert.alert('Attention', 'Please enter the Date first!');
      return; // Exit the function if date is not available
    }

    try {
      const dailyReportCollectionRef = collection(
        db,
        'Student',
        data.studentCNIC,
        'dailyReport',
      );

      const dailyReportDocRef = doc(dailyReportCollectionRef, `${date}`);

      const dailyReportData = {
        date: date,
        month: month_year,
        sabaqLines: sabaqLines,
        sabaqStatus: sabaqStatus,
        sabaqiParaNumber: sabaqiParaNumber,
        sabaqiStatus: sabaqiStatus,
        manzilParaNumber: manzilParaNumber,
        manzilStatus: manzilStatus,
      };
      await setDoc(dailyReportDocRef, dailyReportData);

      ToastAndroid.show(
        `Daily Report of ${data.name} has been saved`,
        ToastAndroid.SHORT,
      );
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

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
            onChangeText={text => {
              setSabaqLines(text);
            }}
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
            onChangeText={text => {
              setSabaqiParaNumber(text);
            }}
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
            onChangeText={text => {
              setManzilParaNumber(text);
            }}
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
      <SubmitButton title={'SUBMIT'} onPress={submitButton} />
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
