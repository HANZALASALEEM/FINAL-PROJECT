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

const HomeworkScreen = () => {
  const navigation = useNavigation();

  const [className, setClassName] = useState(null);
  const [date, setDate] = useState(null);
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
  ]);
  const [physics, setPhysics] = useState(null);
  const [computer, setComputer] = useState(null);
  const [math, setMath] = useState(null);
  const [chemistry, setChemistry] = useState(null);
  const [english, setEnglish] = useState(null);
  const [urdu, setUrdu] = useState(null);
  const [islamiyat, setIslamiyat] = useState(null);
  const [pakSt, setPakSt] = useState(null);

  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(0);

  const getStudent = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'Student'),
        where('class', '==', className),
      );
      const querySnapshot = await getDocs(q);
      const students = [];
      querySnapshot.forEach(doc => {
        students.push({id: doc.id, ...doc.data()});
      });
      setStudentData(students);
    } catch (error) {
      console.error('Error fetching Students:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }

    console.log(studentData);
    console.log('getStudent work done');
  };

  const submitAttendance = async item => {
    if (!date) {
      // Show an alert to enter the date if it's not available
      Alert.alert('Please enter the date');
      return; // Exit the function if date is not available
    }
    const month_year = date.slice(-6);
    try {
      const attendanceCollectionRef = collection(db, 'Attendance');

      // Use setDoc to update or create a document with a specific rollNo
      const attendanceRef = doc(
        attendanceCollectionRef,
        month_year,
        className,
        date,
      );
      const studentAttendanceData = {
        name: item.name,
        date: date,
        present: present,
      };
      await setDoc(attendanceRef, studentAttendanceData);

      console.log(
        'Document updated/added with rollNo: ',
        newStudentData.studentCNIC,
      );
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
      <View>
        <TitleAndInput
          title={'DATE'}
          icon={require('../../../assets/icons/calendar.png')}
          placeholder={'eg: 27-3-2024'}
          onChangeText={text => setDate(text)}
        />
      </View>
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
        <Text style={styles.heading}>SUBJECTS</Text>
        <TitleAndInput
          title={'PHYSICS'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setPhysics(text)}
        />
        <TitleAndInput
          title={'MATH'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setMath(text)}
        />
        <TitleAndInput
          title={'COMPUTER'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setComputer(text)}
        />
        <TitleAndInput
          title={'CHEMISTRY'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setChemistry(text)}
        />
        <TitleAndInput
          title={'ENGLISH'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setEnglish(text)}
        />
        <TitleAndInput
          title={'URDU'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setUrdu(text)}
        />
        <TitleAndInput
          title={'ISLAMIYAT'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setIslamiyat(text)}
        />
        <TitleAndInput
          title={'PAK STUDIES'}
          icon={require('../../../assets/icons/books.png')}
          placeholder={'Homework Detail'}
          onChangeText={text => setPakSt(text)}
        />
      </ScrollView>

      {/* 10% for Get Student Button Container */}
      <View style={styles.buttonContainer}>
        <SubmitButton title={'SUBMIT HOMEWORK'} onPress={() => getStudent()} />
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
