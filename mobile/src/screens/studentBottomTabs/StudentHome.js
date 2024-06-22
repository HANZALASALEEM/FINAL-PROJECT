import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../assets/color/Color';
import Navbar from '../../components/Navbar';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Alert,
} from 'firebase/firestore';
import {db} from '../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import StudentAttendence from './extraScreens/StudentAttendence';

const StudentHome = ({route}) => {
  const navigation = useNavigation();
  const {params} = route;
  const data = params ? params.data : null;
  const [timeTableData, setTimeTableData] = useState([]);
  const [updatesData, setUpdatesData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    console.log(data.class);
    const fetchData = async () => {
      try {
        // Time Table Data Fetching
        const timeTableQuery = query(
          collection(db, 'TimeTable'),
          where('teacherName', '==', data.name),
          orderBy('periodNo', 'asc'),
        );
        const timeTableSnapshot = await getDocs(timeTableQuery);
        const timeTable = timeTableSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimeTableData(timeTable);

        // Notification Data Fetching
        const updatesQuery = query(
          collection(db, 'Notification'),
          orderBy('date', 'desc'),
          limit(1),
        );
        const updatesSnapshot = await getDocs(updatesQuery);
        const updates = updatesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpdatesData(updates);

        // Events Data Fetching
        const eventsQuery = query(
          collection(db, 'Event'),
          orderBy('date', 'desc'),
          limit(1),
        );
        const eventsSnapshot = await getDocs(eventsQuery);
        const events = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEventsData(events);
      } catch (error) {
        Alert.alert('Error', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'SUFFAH ISLAMIC CENTER'}
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/images/suffah-mono.png')}
      />
      <ScrollView style={styles.scrollView}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerImageContainer}>
            <Image
              source={require('../../assets/icons/profile-user.png')}
              style={styles.bannerImage}
            />
          </View>
          <View>
            <Text style={styles.teacherNameText}>
              {data.name + ' ' + data.fatherName}
            </Text>
            <View style={styles.classInchargeContainer}>
              <Text style={styles.classInchargeText}>CLASS</Text>
              <Text style={styles.classInchargeText}>{data.class}</Text>
            </View>
          </View>
        </View>

        {/* Attendence and Complaint Container */}
        <View style={styles.attendenceAndComplaintContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.navigate('StudentAttendence', {data: data});
            }}>
            <Image
              source={require('../../assets/icons/attendance.png')}
              style={styles.icon}
            />
            <Text style={[styles.descriptionText, {marginTop: 5}]}>
              ATTENDENCE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.navigate('StudentComplaint', {data: data});
            }}>
            <Image
              source={require('../../assets/icons/feedback.png')}
              style={styles.icon}
            />
            <Text style={[styles.descriptionText, {marginTop: 5}]}>
              COMPLAINT
            </Text>
          </TouchableOpacity>
        </View>

        {/* Updates Container */}
        <View style={styles.updateContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.heading}>UPDATES</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('StudentNotification')}>
              <Text
                style={[
                  styles.classInchargeText,
                  {textDecorationLine: 'underline'},
                ]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={COLOR.blue} />
          ) : (
            <FlatList
              data={updatesData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[styles.timetableItem, {flexDirection: 'row'}]}
                  onPress={() =>
                    navigation.navigate('NotificationViewScreen', {data: item})
                  }>
                  <Text style={[styles.descriptionText, {color: COLOR.blue}]}>
                    {item.notification.length > 18
                      ? item.notification.substring(0, 18).toUpperCase() + '...'
                      : item.notification}
                  </Text>
                  <Text style={styles.descriptionText}>
                    {item.date
                      ? item.date.toDate().toDateString().toUpperCase()
                      : ''}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Events Container */}
        <View style={styles.updateContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.heading}>EVENTS</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('StudentEvent')}>
              <Text
                style={[
                  styles.classInchargeText,
                  {textDecorationLine: 'underline'},
                ]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={COLOR.blue} />
          ) : (
            <FlatList
              data={eventsData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.eventItem}
                  onPress={() =>
                    navigation.navigate('EventViewScreen', {data: item})
                  }>
                  <Image source={{uri: item.image}} style={styles.eventImage} />
                  <Text style={styles.eventTitle}>
                    {item.title.toUpperCase()}
                  </Text>
                  <Text style={styles.eventDate}>
                    {item.date.toDate().toDateString().toUpperCase()}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollView: {},
  banner: {
    height: hp('20%'),
    width: wp('90%'),
    backgroundColor: COLOR.blue,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 15,
    shadowColor: COLOR.lightBlue, // Shadow color
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 3, // Shadow blur radius
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  bannerImageContainer: {
    padding: 10,
  },
  bannerImage: {
    height: 70,
    width: 70,
  },
  teacherNameText: {
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 16,
    textAlign: 'center',
  },
  classInchargeContainer: {
    flexDirection: 'row',
  },
  classInchargeText: {
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 14,
    marginRight: 7,
    paddingTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  attendenceAndComplaintContainer: {
    width: wp('90%'),
    height: 70,
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
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: {width: 2, height: 2}, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
  },
  descriptionText: {
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 12,
  },
  timetableItem: {
    height: 50,
    width: '95%',
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
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  updateContainer: {
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: 10,
  },
  eventItem: {
    height: hp('20%'),
    width: wp('90%'),
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: COLOR.black, // Shadow color
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6, // Shadow opacity (0 to 1)
    shadowRadius: 3, // Shadow blur radius
    elevation: 5,
    alignSelf: 'center',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  eventTitle: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 18,
  },
  eventDate: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 14,
  },
});
