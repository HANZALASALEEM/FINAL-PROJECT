import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../../assets/color/Color';
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
import {useNavigation} from '@react-navigation/native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
const TestReportScreen = () => {
  const navigation = useNavigation();

  const [className, setClassName] = useState(null);
  const [date, setDate] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [openClasses, setOpenClasses] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(0);
  const [totalTestMarks, setTotalTestMarks] = useState(0);
  const [subjectName, setSubjectName] = useState(null);
  const [classes, setClasses] = useState([
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

  const [subjects, setSubjects] = useState([
    {label: 'Physics', value: 'Physics'},
    {label: 'Chemistry', value: 'Chemistry'},
    {label: 'Computer', value: 'Computer'},
    {label: 'Math', value: 'Math'},
    {label: 'English', value: 'English'},
    {label: 'Urdu', value: 'Urdu'},
    {label: 'Islamiyat', value: 'Islamiyat'},
    {label: 'Pak Studies', value: 'Pak Studies'},
    {label: 'Biology', value: 'Biology'},
  ]);

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
        title={'TEST REPORT'}
        leftIcon={require('../../../assets/icons/left-arrow.png')}
        rightIcon={require('../../../assets/images/suffah-mono.png')}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        onPressRightIcon={() => {
          console.log('SUFFAH LOGO');
        }}
      />
      <ScrollView>
        <View>
          {/* <TitleAndInput
          title={'DATE'}
          icon={require('../../../assets/icons/calendar.png')}
          placeholder={'eg: 27-3-2024'}
          onChangeText={text => setDate(text)}
        /> */}
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
        <DropDownPicker
          items={classes} // Pass the items array
          value={value}
          zIndex={10000}
          //defaultValue={className}
          setValue={setValue}
          setItems={setClasses}
          theme="LIGHT"
          open={openClasses}
          setOpen={setOpenClasses}
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
        <DropDownPicker
          items={subjects} // Pass the items array
          value={value}
          //defaultValue={className}
          setValue={setValue}
          setItems={setSubjects}
          theme="LIGHT"
          open={openSubject}
          setOpen={setOpenSubject}
          placeholder="Select Subject"
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
            setSubjectName(item.value);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder={'Total Test Marks'}
          placeholderTextColor={'gray'}
          value={totalTestMarks}
          onChangeText={text => {
            setTotalTestMarks(text);
          }}
        />
        {/* 10% for Get Student Button Container */}
        <View style={styles.buttonContainer}>
          <SubmitButton title={'GET STUDENT'} onPress={() => getStudent()} />
        </View>
        <View style={styles.playgroundContainer}>
          <View style={styles.infoBar}>
            <Text style={{width: '50%', color: COLOR.black}}>STUDENT NAME</Text>
            <Text style={{width: '25%', color: 'green'}}>OBT. MARKS</Text>
            <Text style={{width: '25%', color: 'red'}}></Text>
          </View>

          {/* Show activity indicator while loading */}
          {loading ? (
            <ActivityIndicator size="large" color={COLOR.blue} />
          ) : (
            <FlatList
              data={studentData}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <View style={styles.flatlistEachContainer}>
                  <Text style={{width: '50%', color: COLOR.black}}>
                    {item.name}
                  </Text>
                  <TextInput style={styles.obtainMarksInput} />
                  <View style={styles.radioButtonContainer}>
                    <TouchableOpacity
                      onPress={item => {
                        // setPresent(1);

                        // Create a copy of studentData
                        const updatedStudentData = [...studentData];
                        // Update the present status for the current item
                        updatedStudentData[index].present = 1;
                        // Set the updated studentData
                        setStudentData(updatedStudentData);
                        submitAttendance(item);
                      }}>
                      <Image
                        source={
                          item.present == 1
                            ? require('../../../assets/icons/tick-outline.png')
                            : require('../../../assets/icons/tick-fill.png')
                        }
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TestReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
    marginTop: 10,
  },
  buttonContainer: {
    marginVertical: 5,
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  playgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBar: {
    flexDirection: 'row',
    height: 50,
    width: wp('100%'),
    backgroundColor: '#c1c1c1',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  flatlistEachContainer: {
    flexDirection: 'row',
    height: 50,
    width: wp('100%'),
    // backgroundColor: '#ffa9a9',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  obtainMarksInput: {
    height: '90%',
    width: '25%',
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
  radioButtonContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
