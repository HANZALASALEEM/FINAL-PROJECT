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
import COLOR from '../../assets/color/Color';
import Navbar from '../../components/Navbar';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
import {db} from '../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TitleAndInput from '../../components/TitleAndInput';
import SubmitButton from '../../components/SubmitButton';
import {Calendar} from 'react-native-calendars';

const TeacherAttendance = () => {
  const [className, setClassName] = useState(null);
  const [date, setDate] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const month_year = date.slice(0, 7);
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
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(0);

  const getStudent = async () => {
    console.log(date);
    console.log(month_year);
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
        title={'ATTENDANCE'}
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/images/suffah-mono.png')}
      />
      <ScrollView>
        <View>
          {/* <TitleAndInput
          title={'DATE'}
          icon={require('../../assets/icons/calendar.png')}
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
        {/* 10% for Get Student Button Container */}
        <View style={styles.buttonContainer}>
          <SubmitButton title={'GET STUDENT'} onPress={() => getStudent()} />
        </View>
        <View style={styles.playgroundContainer}>
          <View style={styles.infoBar}>
            <Text style={{width: '50%', color: COLOR.black}}>STUDENT NAME</Text>
            <Text style={{width: '25%', color: 'green'}}>PRESENT</Text>
            <Text style={{width: '25%', color: 'red'}}>ABSENT</Text>
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
                            ? require('../../assets/icons/radio-green-fill.png')
                            : require('../../assets/icons/radio-green-outline.png')
                        }
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.radioButtonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        //setPresent(-1);

                        // Create a copy of studentData
                        const updatedStudentData = [...studentData];
                        // Update the present status for the current item
                        updatedStudentData[index].present = -1;
                        // Set the updated studentData
                        setStudentData(updatedStudentData);
                      }}>
                      <Image
                        source={
                          item.present == -1
                            ? require('../../assets/icons/radio-red-fill.png')
                            : require('../../assets/icons/radio-red-outline.png')
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

export default TeacherAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
    backgroundColor: '#ffa9a9',
    alignItems: 'center',
    paddingHorizontal: 10,
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
