import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../../assets/color/Color';
import Navbar from '../../../components/Navbar';
import {collection, getDocs, orderBy, query, where} from 'firebase/firestore';
import {db} from '../../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const StudentAttendence = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [className, setClassName] = useState(data.class);

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1 and pad single digit months with a leading zero
      const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days with a leading zero
      return `${year}-${month}-${day}`;
    };

    setDate(getCurrentDate());

    const fetchAttendanceData = async () => {
      if (!className) return;
      const month_year = getCurrentDate().slice(0, 7); // Format month_year correctly

      setLoading(true);
      try {
        const q = query(
          collection(db, 'Attendance', className, month_year),
          where('date', '>=', `${month_year}-01`),
          where('date', '<=', `${month_year}-31`),
          orderBy('date', 'desc'),
        );

        const querySnapshot = await getDocs(q);
        const attendanceRecords = [];
        querySnapshot.forEach(doc => {
          attendanceRecords.push({id: doc.id, ...doc.data()});
        });
        setAttendanceData(attendanceRecords);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [className]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={data.name.toUpperCase()}
        leftIcon={require('../../../assets/icons/menu.png')}
        rightIcon={require('../../../assets/images/suffah-mono.png')}
        onPressLeftIcon={() => console.log('left Icon Pressed')}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>REPORT</Text>
        {date.slice(5, 7) === '01' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>JANUARY</Text>
        ) : date.slice(5, 7) === '02' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>FEBRUARY</Text>
        ) : date.slice(5, 7) === '03' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>MARCH</Text>
        ) : date.slice(5, 7) === '04' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>APRIL</Text>
        ) : date.slice(5, 7) === '05' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>MAY</Text>
        ) : date.slice(5, 7) === '06' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>JUNE</Text>
        ) : date.slice(5, 7) === '07' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>JULY</Text>
        ) : date.slice(5, 7) === '08' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>AUGUST</Text>
        ) : date.slice(5, 7) === '09' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>SEPTEMBER</Text>
        ) : date.slice(5, 7) === '10' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>OCTOBER</Text>
        ) : date.slice(5, 7) === '11' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>NOVEMBER</Text>
        ) : date.slice(5, 7) === '12' ? (
          <Text style={[styles.text, {color: COLOR.lightBlue}]}>DECEMBER</Text>
        ) : (
          <Text style={[styles.text, {color: COLOR.black}]}>THIS MONTH</Text>
        )}
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

export default StudentAttendence;

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
