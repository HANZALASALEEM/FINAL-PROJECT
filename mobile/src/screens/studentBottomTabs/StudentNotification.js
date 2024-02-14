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
import {db} from '../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLOR from '../../assets/color/Color';
import Navbar from '../../components/Navbar';

const StudentNotification = () => {
  const navigation = useNavigation();
  const [updatesData, setUpdatesData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const getUpdates = async () => {
      try {
        const q = query(
          collection(db, 'Notification'),
          orderBy('date', 'desc'),
        );
        const querySnapshot = await getDocs(q);
        const notification = [];
        querySnapshot.forEach(doc => {
          notification.push({id: doc.id, ...doc.data()});
        });
        setUpdatesData(notification);
      } catch (error) {
        console.error('Error fetching updates:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    getUpdates();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'NOTIFICATIONS'}
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/images/suffah-mono.png')}
      />

      <View style={styles.updateContainer}>
        {/* Show activity indicator while loading */}
        {loading ? (
          <ActivityIndicator size="large" color={COLOR.blue} />
        ) : (
          <FlatList
            data={updatesData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[styles.notificationItem, {flexDirection: 'row'}]}
                onPress={() =>
                  navigation.navigate('NotificationViewScreen', {data: item})
                }>
                <Text style={[styles.text, {color: COLOR.blue}]}>
                  {item.notification.length > 18
                    ? item.notification.substring(0, 18).toUpperCase() + '...'
                    : item.notification.toUpperCase()}
                </Text>
                <Text style={styles.text}>
                  {item.date
                    ? item.date.toDate().toDateString().toUpperCase()
                    : ''}
                </Text>
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
    paddingHorizontal: 5,
  },
  text: {
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    fontSize: 14,
    marginRight: 7,
    paddingTop: 10,
  },
});

export default StudentNotification;
