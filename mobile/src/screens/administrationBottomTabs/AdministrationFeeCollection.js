import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../assets/color/Color';
import Navbar from '../../components/Navbar';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import {db} from '../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

const AdministrationFeeCollection = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const [date, setDate] = useState('');
  const [localDate, setLocalDate] = useState(null);
  const [feeCollectionData, setFeeCollectionData] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading

  const [totalAmounts, setTotalAmounts] = useState({
    totalAdmissionFee: 0,
    totalOriginalFee: 0,
    totalReceivedFee: 0,
    totalMiscFee: 0,
  });
  useEffect(() => {
    const convertDateIntoLocalDate = inputDateString => {
      // Parse the input date string
      const newDate = new Date(inputDateString);

      // Format the day
      const day = newDate.getUTCDate(); // Use getUTCDate to avoid local timezone issues

      // Format the month (months are zero-indexed in JavaScript Date)
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const month = monthNames[newDate.getUTCMonth()];

      // Format the year
      const year = newDate.getUTCFullYear();

      // Define the timezone offset in hours
      const timezoneOffset = 5; // For UTC+5

      // Construct the formatted date string
      //   return `${day} ${month} ${year} at 00:00:00 UTC+${timezoneOffset}`;
      return `${day} ${month} ${year}`;
    };

    if (date) {
      const formattedDate = convertDateIntoLocalDate(date);
      setLocalDate(formattedDate);
      console.log(localDate);
    }
  }, [date]);

  useEffect(() => {
    const fetchFeeCollectionData = async () => {
      if (!date) return;

      setLoading(true);
      try {
        const q = query(
          collection(db, 'FeeSubmission'),
          where('date', '==', localDate),
        );

        const querySnapshot = await getDocs(q);
        const FeeCollectionRecords = [];
        let totalAdmissionFee = 0;
        let totalOriginalFee = 0;
        let totalReceivedFee = 0;
        let totalMiscFee = 0;
        querySnapshot.forEach(doc => {
          const data = {id: doc.id, ...doc.data()};
          FeeCollectionRecords.push(data);
          totalAdmissionFee += parseFloat(data.admissionFee) || 0;
          totalOriginalFee += parseFloat(data.originalFee) || 0;
          totalReceivedFee += parseFloat(data.receivedFee) || 0;
          totalMiscFee += parseFloat(data.miscFee) || 0;
        });
        setFeeCollectionData(FeeCollectionRecords);
        setTotalAmounts({
          totalAdmissionFee,
          totalOriginalFee,
          totalReceivedFee,
          totalMiscFee,
        });
        console.log(localDate);
        console.log(feeCollectionData);
      } catch (error) {
        console.error('Error fetching FeeCollection data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeCollectionData();
  }, [localDate]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'FEE COLLECTION'}
        onPressLeftIcon={() => {
          console.log('Left Icon Pressed');
        }}
        onPressRightIcon={() => {
          console.log('Right Icon Pressed');
        }}
      />
      <ScrollView>
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
        <View style={styles.flatlistEachContainer}>
          <Text style={[styles.text, {color: COLOR.blue}]}>
            TOTAL RECEIVED FEE:
          </Text>
          <Text style={[styles.text, {color: COLOR.blue}]}>
            {totalAmounts.totalReceivedFee}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={COLOR.blue} />
        ) : (
          <FlatList
            style={styles.flatlistContainer}
            data={feeCollectionData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.flatlistEachContainer}>
                <Text style={[styles.text, {color: COLOR.blue}]}>
                  {item.name}
                </Text>
                <Text style={[styles.text, {color: COLOR.blue}]}>
                  {item.class}
                </Text>
                <Text style={[styles.text, {color: COLOR.blue}]}>
                  {item.receivedFee}
                </Text>
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AdministrationFeeCollection;

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
