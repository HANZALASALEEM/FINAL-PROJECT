import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Navbar from '../../../components/Navbar';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import {db} from '../../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TitleAndInput from '../../../components/TitleAndInput';
import SubmitButton from '../../../components/SubmitButton';
import COLOR from '../../../assets/color/Color';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
const HomeworkScreen = () => {
  const navigation = useNavigation();

  const [className, setClassName] = useState(null);
  const [date, setDate] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Nursery', value: 'Nursery'},
    {label: 'KG', value: 'KG'},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
  ]);
  const [physics, setPhysics] = useState(null);
  const [computer, setComputer] = useState(null);
  const [math, setMath] = useState(null);
  const [chemistry, setChemistry] = useState(null);
  const [english, setEnglish] = useState(null);
  const [urdu, setUrdu] = useState(null);
  const [islamiyat, setIslamiyat] = useState(null);
  const [pakSt, setPakSt] = useState(null);
  const [biology, setBiology] = useState(null);

  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(0);
  const month_year = date.slice(0, 7);
  const year = date.slice(0, 4);
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
  useEffect(() => {
    const getTodayHomework = async () => {
      try {
        const homeworkCollectionRef = collection(
          db,
          'Homework',
          year,
          month_year,
        );
        const homeworkDocId = `${className}_${date}`;
        const homeworkDoc = await getDoc(
          doc(homeworkCollectionRef, homeworkDocId),
        );
        console.log(year);
        if (homeworkDoc.exists()) {
          ToastAndroid.show('Homework Retrieving ...', ToastAndroid.SHORT);
          const data = homeworkDoc.data();
          setPhysics(data.physics);
          setComputer(data.computer);
          setMath(data.math);
          setChemistry(data.chemistry);
          setEnglish(data.english);
          setUrdu(data.urdu);
          setIslamiyat(data.islamiyat);
          setPakSt(data.pakSt);
          setBiology(data.biology);
        } else {
          ToastAndroid.show(
            'No homework found for the selected class and date.',
            ToastAndroid.SHORT,
          );
          setPhysics(null);
          setComputer(null);
          setMath(null);
          setChemistry(null);
          setEnglish(null);
          setUrdu(null);
          setIslamiyat(null);
          setPakSt(null);
          setBiology(null);
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      } finally {
        console.log('overall function works');
      }
    };
    getTodayHomework();
  }, [className, date]);

  const submitHomework = async () => {
    if (!date || !className) {
      // Show an alert to enter the date if it's not available
      Alert.alert('Attention', 'Please enter the date and select the class');
      return; // Exit the function if date is not available
    }

    try {
      const homeworkCollectionRef = collection(db, 'Homework');

      // Use setDoc to update or create a document with a specific rollNo
      const homeworkRef = doc(
        homeworkCollectionRef,
        year,
        month_year,
        `${className}_${date}`,
      );
      const homeworkData = {
        physics: physics || '',
        computer: computer || '',
        math: math || '',
        chemistry: chemistry || '',
        english: english || '',
        urdu: urdu || '',
        islamiyat: islamiyat || '',
        pakSt: pakSt || '',
        biology: biology || '',
        date: date,
        class: className,
      };
      await setDoc(homeworkRef, homeworkData);

      ToastAndroid.show('Homework Submitted!', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'HOMEWORK'}
        leftIcon={require('../../../assets/icons/left-arrow.png')}
        rightIcon={require('../../../assets/images/suffah-mono.png')}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <DropDownPicker
        items={items} // Pass the items array
        value={value}
        //defaultValue={className}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        open={open}
        setOpen={setOpen}
        placeholder="Select Class"
        containerStyle={{
          height: 50,
          width: wp('90%'),
          alignSelf: 'center',
          marginTop: 10,
        }}
        dropDownContainerStyle={{
          backgroundColor: COLOR.white,
          borderWidth: 0.3,
        }}
        style={{backgroundColor: COLOR.white, borderWidth: 0.3}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onSelectItem={item => {
          setClassName(item.value);
        }}
      />
      <ScrollView>
        {/* <View>
        <TitleAndInput
          title={'DATE'}
          icon={require('../../../assets/icons/calendar.png')}
          placeholder={'eg: 27-3-2024'}
          onChangeText={text => setDate(text)}
        />
      </View> */}

        <View>
          <Calendar
            onDayPress={day => {
              setDate(day.dateString);
            }}
            markedDates={{
              [date]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: '#6e6a63',
              },
            }}
          />
        </View>

        <Text style={styles.heading}>SUBJECTS</Text>
        <TitleAndInput
          title={'PHYSICS'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setPhysics(text)}
          value={physics}
        />
        <TitleAndInput
          title={'MATH'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setMath(text)}
          value={math}
        />
        <TitleAndInput
          title={'COMPUTER'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setComputer(text)}
          value={computer}
        />
        <TitleAndInput
          title={'CHEMISTRY'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setChemistry(text)}
          value={chemistry}
        />
        <TitleAndInput
          title={'ENGLISH'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setEnglish(text)}
          value={english}
        />
        <TitleAndInput
          title={'URDU'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setUrdu(text)}
          value={urdu}
        />
        <TitleAndInput
          title={'ISLAMIYAT'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setIslamiyat(text)}
          value={islamiyat}
        />
        <TitleAndInput
          title={'PAK STUDIES'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setPakSt(text)}
          value={pakSt}
        />
      </ScrollView>

      {/* 10% for Get Student Button Container */}
      <View style={styles.buttonContainer}>
        <SubmitButton
          title={'SUBMIT HOMEWORK'}
          onPress={() => submitHomework()}
        />
      </View>
    </View>
  );
};

export default HomeworkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  heading: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: {width: 2, height: 2}, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
    marginLeft: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 5,
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 24,
    height: 24,
  },
});
