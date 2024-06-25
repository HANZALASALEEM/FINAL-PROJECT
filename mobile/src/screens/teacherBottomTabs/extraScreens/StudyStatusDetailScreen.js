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
import {collection, setDoc, doc} from 'firebase/firestore';
import {db} from '../../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TitleAndInput from '../../../components/TitleAndInput';
import SubmitButton from '../../../components/SubmitButton';
import {useNavigation} from '@react-navigation/native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
const StudyStatusDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const [date, setDate] = useState(null);
  const [studyStatus, setStudyStatus] = useState(null);

  const submitButton = async () => {
    if (!date) {
      // Show an alert to enter the date if it's not available
      Alert.alert('Attention', 'Please enter the Date first!');
      return; // Exit the function if date is not available
    }

    try {
      const studyStatusCollectionRef = collection(
        db,
        'Student',
        data.studentCNIC,
        'studyStatus',
      );

      const studyStatusDocRef = doc(studyStatusCollectionRef, `${date}`);

      const studyStatusData = {
        date: date,
        status: studyStatus,
      };
      await setDoc(studyStatusDocRef, studyStatusData);

      ToastAndroid.show(
        `Study Status of ${data.name} has been saved`,
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
        title={data.name}
        leftIcon={require('../../../assets/icons/left-arrow.png')}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        onPressRightIcon={() => {
          console.log('Right Icon Pressed');
        }}
      />
      <ScrollView>
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
        <Text style={styles.heading}>STUDENT STUDY STATUS</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Comment on the Student study status..."
          placeholderTextColor="gray"
          onChangeText={text => setStudyStatus(text)}
        />
        <View style={styles.button}>
          <SubmitButton title={'SUBMIT'} onPress={submitButton} />
        </View>
      </ScrollView>
    </View>
  );
};

export default StudyStatusDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  heading: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
    textShadowOffset: {width: 2, height: 2}, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    height: hp('25%'),
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
    textAlignVertical: 'top',
  },
  button: {
    marginVertical: 10,
  },
});
