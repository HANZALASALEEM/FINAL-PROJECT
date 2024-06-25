import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {collection, query, orderBy, getDocs} from 'firebase/firestore';
import {db} from '../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../../assets/color/Color';
import Navbar from '../../components/Navbar';

const StudentEvent = () => {
  const navigation = useNavigation();
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const getEvents = async () => {
      try {
        const q = query(collection(db, 'Event'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const event = [];
        querySnapshot.forEach(doc => {
          event.push({id: doc.id, ...doc.data()});
        });
        setEventsData(event);
      } catch (error) {
        console.error('Error fetching updates:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    getEvents();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'EVENTS'}
        onPressLeftIcon={() => {
          console.log('Left Icon Pressed');
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
    </View>
  );
};

export default StudentEvent;

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
  eventItem: {
    height: hp('20%'),
    width: wp('90%'),
    borderRadius: 10,
    marginTop: 10,
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
