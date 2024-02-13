import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '../../assets/color/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import TitleAndInput from '../../components/TitleAndInput';
import SubmitButton from '../../components/SubmitButton';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '../../firebase/firebase.config';
const TeacherLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('hanzala@suffah.edu.pk');
  const [password, setPassword] = useState('Your CNIC');
  const [employeeData, setEmployeeData] = useState([]);

  const signIn = async () => {
    console.log('Sign In');
    const q = query(
      collection(db, 'Employee'),
      where('email', '==', email),
      where('employeeCNIC', '==', password),
      where('designation', '==', 'teacher'),
    );
    const querySnapshot = await getDocs(q);
    const employee = [];
    querySnapshot.forEach(doc => {
      employee.push({id: doc.id, ...doc.data()});
    });
    setEmployeeData(employee);

    // Check if any employee found
    if (employee.length > 0) {
      // Navigate to the other screen and pass data
      navigation.navigate('OnBoardingScreen1', {data: employee[0]});
      console.log(employee[0]);
    } else {
      console.log('Employee not found');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />

      {/* 30% For Banner */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerContainerHeading}>WELLCOME!</Text>
        <Text style={styles.bannerContainerTitle}>
          SIGN IN WITH PROVIDED TEACHER EMAIL
        </Text>
      </View>

      <View>
        <TitleAndInput
          icon={require('../../assets/icons/mail.png')}
          placeholder={'hanzala@suffah.edu.pk'}
          title={'EMAIL'}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TitleAndInput
          icon={require('../../assets/icons/password.png')}
          placeholder={'Your CNIC'}
          title={'PASSWORD'}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      {/* 10% for Sign In Button Container */}
      <View style={styles.buttonContainer}>
        <SubmitButton title={'SIGN IN'} onPress={() => signIn()} />
      </View>

      <View style={styles.goBackButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackButtonText}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TeacherLoginScreen;

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
  goBackButtonContainer: {
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackButtonText: {
    textDecorationLine: 'underline',
    color: 'gray',
    fontFamily: 'times new roman',
  },
});
