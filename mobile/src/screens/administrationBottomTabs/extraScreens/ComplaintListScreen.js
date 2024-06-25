import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {collection, query, orderBy, getDocs} from 'firebase/firestore';
import {db} from '../../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../../../assets/color/Color';
import Navbar from '../../../components/Navbar';

const ComplaintListScreen = () => {
  const navigation = useNavigation();
  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [date, setDate] = useState('');

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
    const month_year = date.slice(0, 7); // Format month_year correctly

    const getComplaints = async () => {
      try {
        const q = query(
          collection(db, 'Complaint', month_year, 'complaints'),
          orderBy('date', 'desc'),
        );
        const querySnapshot = await getDocs(q);
        const complaint = [];
        querySnapshot.forEach(doc => {
          complaint.push({id: doc.id, ...doc.data()});
        });
        setComplaintsData(complaint);
        console.log(complaintsData);
      } catch (error) {
        console.error('Error fetching complaint:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    if (date) {
      getComplaints();
    }
  }, [date]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'COMPLAINTS'}
        leftIcon={require('../../../assets/icons/left-arrow.png')}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        onPressRightIcon={() => {
          console.log('Right Icon Pressed');
        }}
      />

      <View style={styles.updateContainer}>
        {/* Show activity indicator while loading */}
        {loading ? (
          <ActivityIndicator size="large" color={COLOR.blue} />
        ) : (
          <FlatList
            data={complaintsData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[styles.notificationItem, {flexDirection: 'row'}]}
                onPress={() =>
                  navigation.navigate('ComplaintDetailScreen', {data: item})
                }>
                <Text style={[styles.text, {color: COLOR.blue}]}>
                  {item.studentName.length > 18
                    ? item.studentName.substring(0, 18).toUpperCase() + '...'
                    : item.studentName.toUpperCase()}
                </Text>
                <Text style={styles.text}>{item.class}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  updateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationItem: {
    height: 50,
    width: '95%',
    borderRadius: 10,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: COLOR.white,
    alignSelf: 'center',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  text: {
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 12,
  },
});

export default ComplaintListScreen;
