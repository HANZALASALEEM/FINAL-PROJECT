import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Navbar from '../../components/Navbar';
import COLOR from '../../assets/color/Color';
import DropDownPicker from 'react-native-dropdown-picker';
import TitleAndInput from '../../components/TitleAndInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const TeacherHifz = () => {
  const navigation = useNavigation();

  const [className, setClassName] = useState(null);
  const [date, setDate] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Nursury', value: 'Nursury'},
    {label: 'KG', value: 'KG'},
  ]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'HIFZ E QURAN'}
        onPressLeftIcon={() => {
          console.log('Left Icon Pressed');
        }}
        onPressRightIcon={() => {
          console.log('Right Icon Pressed');
        }}
      />

      <View style={styles.rowOptionContainer}>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              navigation.navigate('HifzDailyReportScreen');
            }}>
            <View style={styles.optionButtonIconContainer}>
              <Image
                source={require('../../assets/icons/homework.png')}
                style={styles.optionButtonIcon}
              />
            </View>
            <View style={styles.optionButtonSaperator} />
            <View style={styles.optionButtonTextContainer}>
              <Text style={styles.optionButtonText}>DAILY REPORT</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              navigation.navigate('HifzTestReportScreen');
            }}>
            <View style={styles.optionButtonIconContainer}>
              <Image
                source={require('../../assets/icons/test-report.png')}
                style={styles.optionButtonIcon}
              />
            </View>
            <View style={styles.optionButtonSaperator} />
            <View style={styles.optionButtonTextContainer}>
              <Text style={styles.optionButtonText}>TEST REPORT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rowOptionContainer}>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              navigation.navigate('StudyStatusScreen');
            }}>
            <View style={styles.optionButtonIconContainer}>
              <Image
                source={require('../../assets/icons/study-status.png')}
                style={styles.optionButtonIcon}
              />
            </View>
            <View style={styles.optionButtonSaperator} />
            <View style={styles.optionButtonTextContainer}>
              <Text style={styles.optionButtonText}>STUDY STATUS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TeacherHifz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  rowOptionContainer: {
    height: hp('20%'),
    width: wp('95%'),
    //backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    width: '35%',
    height: '100%',
    //backgroundColor: 'yellow',
    marginHorizontal: 20,
  },
  optionButton: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderRadius: 25,
    borderColor: COLOR.gray,
    shadowColor: COLOR.lightBlue, // Shadow color
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 3, // Shadow blur radius
    elevation: 8,
  },
  optionButtonIconContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: COLOR.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonIcon: {width: 70, height: 70},
  optionButtonSaperator: {
    width: '100%',
    height: 1,
    backgroundColor: COLOR.gray,
  },
  optionButtonTextContainer: {
    width: '100%',
    height: '29%',
    backgroundColor: COLOR.white,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonText: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
  },
});
