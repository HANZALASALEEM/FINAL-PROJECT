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
  Alert,
  ToastAndroid,
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
const HifzTestReportScreen = () => {
  const navigation = useNavigation();

  const [className, setClassName] = useState(null);
  const [date, setDate] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [openClasses, setOpenClasses] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const [saved, setSaved] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [obtainMarks, setObtainMarks] = useState(0);
  const [totalTestMarks, setTotalTestMarks] = useState(0);
  const [subjectName, setSubjectName] = useState(null);
  const month_year = date.slice(0, 7);
  const [classes, setClasses] = useState([
    {label: 'مصعب بن عمیر', value: 'مصعب بن عمیر'},
    {label: 'عثمان بن عفان', value: 'عثمان بن عفان'},
    {label: 'ابوبکر صدیق', value: 'ابوبکر صدیق'},
    {label: 'عمر بن خطاب', value: 'عمر بن خطاب'},
    {label: 'علی بن طالب', value: 'علی بن طالب'},
  ]);

  useEffect(() => {
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
    getStudent();
  }, [className]);

  const submitTestReport = async item => {
    if (!date || !totalTestMarks) {
      // Show an alert to enter the date if it's not available
      Alert.alert('Attention', 'Please enter the Date and Total marks first!');
      return; // Exit the function if date is not available
    }

    try {
      const testReportCollectionRef = collection(
        db,
        'Student',
        item.studentCNIC,
        'TestReport',
      );

      const testReportDocRef = doc(testReportCollectionRef, `${date}`);

      const studentTestReportData = {
        name: item.name,
        date: date,
        obtainMarks: item.obtainMarks,
        totalMarks: totalTestMarks,
      };
      await setDoc(testReportDocRef, studentTestReportData);

      ToastAndroid.show(
        `Test Marks of ${item.name} has been saved`,
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
      <DropDownPicker
        items={classes} // Pass the items array
        // value={value}
        value={className}
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

      <ScrollView>
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

        <TextInput
          style={styles.input}
          placeholder={'Total Test Marks'}
          placeholderTextColor={'gray'}
          value={totalTestMarks}
          onChangeText={text => {
            setTotalTestMarks(text);
          }}
        />

        <View style={styles.playgroundContainer}>
          <View style={styles.infoBar}>
            <Text style={{width: '50%', color: COLOR.black}}>STUDENT NAME</Text>
            <Text style={{width: '25%', color: 'green'}}>OBT. MARKS</Text>
            <Text style={{width: '25%', color: COLOR.blue, marginLeft: 15}}>
              SAVE
            </Text>
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
                  <TextInput
                    style={styles.obtainMarksInput}
                    onChangeText={text => setObtainMarks(text)}
                    keyboardType="numeric"
                  />
                  <View style={styles.radioButtonContainer}>
                    <TouchableOpacity
                      onPress={item => {
                        // setPresent(1);

                        // Create a copy of studentData
                        const updatedStudentData = [...studentData];
                        // Update the present status for the current item
                        updatedStudentData[index].obtainMarks = obtainMarks;
                        updatedStudentData[index].saved = true;

                        // Set the updated studentData
                        setStudentData(updatedStudentData);
                        submitTestReport(updatedStudentData[index]);
                      }}>
                      <Image
                        source={
                          item.saved
                            ? require('../../../assets/icons/tick-fill.png')
                            : require('../../../assets/icons/tick-outline.png')
                        }
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}

          {/* 10% for Get Student Button Container */}
          {/* <View style={styles.buttonContainer}>
            <SubmitButton
              title={'SUBMIT RESULT'}
              onPress={() => getStudent()}
            />
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HifzTestReportScreen;

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
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  flatlistEachContainer: {
    flexDirection: 'row',
    height: 50,
    width: wp('100%'),
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
