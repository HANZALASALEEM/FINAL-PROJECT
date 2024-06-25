import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import TitleAndInput from '../../../components/TitleAndInput';
import COLOR from '../../../assets/color/Color';
import SubmitButton from '../../../components/SubmitButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {collection, setDoc, doc} from 'firebase/firestore';
import {db} from '../../../firebase/firebase.config';
const StudentComplaint = ({route}) => {
  const {params} = route;
  const data = params ? params.data : null;
  const navigation = useNavigation();
  const [name, setName] = useState(data.name);
  const [value, setValue] = useState(null);
  const [className, setClassName] = useState(data.class);
  const [complaint, setComplaint] = useState(null);
  const [openClasses, setOpenClasses] = useState(false);
  const [date, setDate] = useState(null);
  const [classes, setClasses] = useState([
    {label: 'Nursery', value: 'Nursery'},
    {label: 'KG', value: 'KG'},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: 'مصعب بن عمیر', value: 'مصعب بن عمیر'},
    {label: 'عثمان بن عفان', value: 'عثمان بن عفان'},
    {label: 'ابوبکر صدیق', value: 'ابوبکر صدیق'},
    {label: 'عمر بن خطاب', value: 'عمر بن خطاب'},
    {label: 'علی بن طالب', value: 'علی بن طالب'},
  ]);

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1 and pad single digit months with a leading zero
      const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days with a leading zero
      return `${year}-${month}-${day}`;
    };

    setDate(getCurrentDate());
    console.log(data.name);
  }, []);

  const submitButton = async () => {
    if (!name || !className) {
      // Show an alert to enter the date if it's not available
      Alert.alert(
        'Attention',
        'Please enter the Student Name and Class first!',
      );
      return; // Exit the function if date is not available
    }
    const month_year = date.slice(0, 7); // Format month_year correctly
    try {
      const complaintCollectionRef = collection(
        db,
        'Complaint',
        month_year,
        'complaints',
      );

      const complaintDocRef = doc(
        complaintCollectionRef,
        `${data.name}_${date}`,
      );

      const complaintData = {
        date: date,
        complaint: complaint,
        studentName: data.name,
        class: data.class,
      };
      await setDoc(complaintDocRef, complaintData);

      ToastAndroid.show(
        `Your Complaint has been delivered.`,
        ToastAndroid.SHORT,
      );
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />

      {/* 30% For Banner */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerContainerHeading}>COMPLAINT!</Text>
        <Text style={styles.bannerContainerTitle}>
          YOUR COMPLAINT SURELY HELPFUL FOR US
        </Text>
      </View>

      {/* <View>
        <TitleAndInput
          icon={require('../../../assets/icons/mail.png')}
          placeholder={'Type Student Name'}
          title={'STUDENT NAME'}
          onChangeText={text => setName(text)}
          value={name}
        />
      </View> */}

      {/* <DropDownPicker
        items={classes} // Pass the items array
        value={className}
        zIndex={1000}
        //defaultValue={className}
        setValue={setValue}
        setItems={setClasses}
        theme="LIGHT"
        open={openClasses}
        setOpen={setOpenClasses}
        placeholder="Select Class"
        containerStyle={{
          height: 50,
          width: wp('90%'),
          alignSelf: 'center',
          marginTop: 10,
        }}
        dropDownContainerStyle={{
          backgroundColor: COLOR.white,
          borderWidth: 0.3,
        }}
        style={{backgroundColor: COLOR.white, borderWidth: 0.3}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onSelectItem={item => {
          setClassName(item.value);
        }}
      /> */}
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Type your complaint..."
        placeholderTextColor="gray"
        onChangeText={text => setComplaint(text)}
      />
      {/* 10% for Sign In Button Container */}
      <View style={styles.buttonContainer}>
        <SubmitButton title={'SUBMIT'} onPress={() => submitButton()} />
      </View>
    </View>
  );
};

export default StudentComplaint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  bannerContainer: {
    height: hp('30%'),
    width: wp('100%'),
    backgroundColor: COLOR.blue,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    paddingLeft: 30,
  },
  bannerContainerHeading: {
    fontSize: 28,
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
    marginBottom: 20,
  },
  bannerContainerTitle: {
    fontSize: 14,
    color: COLOR.lightBlue,
    fontFamily: 'times new roman',
  },
  buttonContainer: {
    marginTop: 20,
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
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
});
