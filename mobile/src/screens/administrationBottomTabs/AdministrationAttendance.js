import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../assets/color/Color';
import Navbar from '../../components/Navbar';
import {collection, getDocs, orderBy, query, where} from 'firebase/firestore';
import {db} from '../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

const AdministrationAttendance = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const month_year = getCurrentDate().slice(0, 7); // Format month_year correctly
      console.log('kam kr raha ht');
      setLoading(true);
      try {
        const q = query(
          collection(db, 'Attendance', month_year, 'attendance'),
          where('date', '==', date),
        );

        const querySnapshot = await getDocs(q);
        const attendanceRecords = [];
        querySnapshot.forEach(doc => {
          attendanceRecords.push({id: doc.id, ...doc.data()});
        });
        setAttendanceData(attendanceRecords);
        console.log(attendanceData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (date) {
      fetchAttendanceData();
    }

    console.log(date);
  }, [date]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'ATTENDANCE'}
        onPressLeftIcon={() => {
          console.log('Left Icon Pressed');
        }}
        onPressRightIcon={() => {
          console.log('Right Icon Pressed');
        }}
      />

      {/* Calendar Container  */}
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
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>ABSENT STUDENTS</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={COLOR.blue} />
      ) : (
        <FlatList
          style={styles.flatlistContainer}
          data={attendanceData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.flatlistEachContainer}>
              <Text style={[styles.text, {color: COLOR.blue}]}>
                {item.date}
              </Text>

              {item.present === '1' ? (
                <Text style={[styles.text, {color: COLOR.green}]}>PRESENT</Text>
              ) : item.present === '-1' ? (
                <Text style={[styles.text, {color: COLOR.red}]}>ABSENT</Text>
              ) : (
                <Text style={[styles.text, {color: COLOR.black}]}>UNKNOWN</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AdministrationAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  headingContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  heading: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: {width: 2, height: 2}, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
  },
  flatlistContainer: {},
  flatlistEachContainer: {
    width: wp('90%'),
    height: 50,
    borderRadius: 10,
    shadowColor: COLOR.black, // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 3, // Shadow blur radius
    elevation: 5,
    backgroundColor: COLOR.white,
    alignSelf: 'center',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 5,
  },
  text: {
    fontFamily: 'times new roman',
    fontSize: 16,
  },
});
