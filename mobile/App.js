import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/navigators/AppNavigator';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Alert,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {db} from './src/firebase/firebase.config';
const App = () => {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('New FCM:', fcmToken);
        await saveFcmToken(fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveFcmToken = async token => {
    try {
      // Query the collection to check if the token already exists
      const querySnapshot = await getDocs(
        query(collection(db, 'FcmToken'), where('token', '==', token)),
      );

      // If the token already exists, return early
      if (!querySnapshot.empty) {
        console.log('FCM token already exists:', token);
        return;
      }

      // If the token does not exist, save it
      const newRef = doc(collection(db, 'FcmToken'));
      await setDoc(newRef, {token});

      console.log('FCM token saved successfully');
    } catch (error) {
      console.error('Error saving FCM token:', error);
    }
  };
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
