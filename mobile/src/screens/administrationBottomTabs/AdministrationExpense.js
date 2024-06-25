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

const AdministrationExpense = ({route}) => {
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [localDate, setLocalDate] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading

  const [totalAmounts, setTotalAmounts] = useState({
    totalGivenAmount: 0,
    totalReceivedAmount: 0,
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
    const fetchExpenseData = async () => {
      if (!date) return;

      setLoading(true);
      try {
        const q = query(
          collection(db, 'Expense'),
          where('date', '==', localDate),
        );

        const querySnapshot = await getDocs(q);
        const ExpenseRecords = [];
        let totalGivenAmount = 0;
        let totalReceivedAmount = 0;
        querySnapshot.forEach(doc => {
          const data = {id: doc.id, ...doc.data()};
          ExpenseRecords.push(data);
          totalGivenAmount += parseFloat(data.givenAmount) || 0;
          totalReceivedAmount += parseFloat(data.receivedAmount) || 0;
        });
        setExpenseData(ExpenseRecords);
        setTotalAmounts({
          totalGivenAmount,
          totalReceivedAmount,
        });
        console.log(localDate);
        console.log(ExpenseData);
      } catch (error) {
        console.error('Error fetching Expense data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseData();
  }, [localDate]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'EXPENSES'}
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

        <View
          style={[
            styles.flatlistEachContainer,
            {height: 100, flexDirection: 'column'},
          ]}>
          {/* Received Amount Container */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '100%',
              height: '50%',
              alignSelf: 'center',
            }}>
            <Text style={[styles.text, {color: COLOR.blue}]}>
              TOTAL RECEIVED AMOUNT:
            </Text>
            <Text style={[styles.text, {color: COLOR.green}]}>
              {totalAmounts.totalReceivedAmount}
            </Text>
          </View>
          {/* Given Amount Container */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '100%',
              height: '50%',
              alignSelf: 'center',
            }}>
            <Text style={[styles.text, {color: COLOR.blue}]}>
              TOTAL GIVEN AMOUNT:
            </Text>
            <Text style={[styles.text, {color: COLOR.red}]}>
              {totalAmounts.totalGivenAmount}
            </Text>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={COLOR.blue} />
        ) : (
          <FlatList
            style={styles.flatlistContainer}
            data={expenseData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.flatlistEachContainer}>
                <Text style={[styles.text, {color: COLOR.blue}]}>
                  {item.purpose}
                </Text>
                {item.givenAmount !== 0 ? (
                  <Text style={[styles.text, {color: COLOR.red}]}>
                    {item.givenAmount}
                  </Text>
                ) : item.receivedAmount !== 0 ? (
                  <Text style={[styles.text, {color: COLOR.green}]}>
                    {item.receivedAmount}
                  </Text>
                ) : null}
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AdministrationExpense;

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
