import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '../../../assets/color/Color';
import Navbar from '../../../components/Navbar';
import DropDownPicker from 'react-native-dropdown-picker';
import {query, collection, where, getDocs} from 'firebase/firestore';
import {db} from '../../../firebase/firebase.config';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SubmitButton from '../../../components/SubmitButton';
import {useNavigation} from '@react-navigation/native';

const HifzDailyReportScreen = () => {
  const navigation = useNavigation();
  const [className, setClassName] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [openClasses, setOpenClasses] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
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
  ]);

  const getStudent = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'Student'),
        where('class', '==', className),
      );
      const querySnapshot = await getDocs(q);
      const students = [];
      querySnapshot.forEach(doc => {
        students.push({id: doc.id, ...doc.data()});
      });
      setStudentData(students);
    } catch (error) {
      console.error('Error fetching Students:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }

    console.log(studentData);
    console.log('getStudent work done');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'DAILY REPORT'}
        leftIcon={require('../../../assets/icons/left-arrow.png')}
        rightIcon={require('../../../assets/images/suffah-mono.png')}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        onPressRightIcon={() => {
          console.log('SUFFAH LOGO');
        }}
      />
      <DropDownPicker
        items={classes} // Pass the items array
        value={value}
        zIndex={10000}
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
      />
      {/* 10% for Get Student Button Container */}
      <View style={styles.buttonContainer}>
        <SubmitButton title={'GET STUDENT'} onPress={() => getStudent()} />
      </View>

      {/* Show activity indicator while loading */}
      {loading ? (
        <ActivityIndicator size="large" color={COLOR.blue} />
      ) : (
        <FlatList
          data={studentData}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.flatlistEachContainer}
              onPress={() =>
                navigation.navigate('HifzDailyReportDetailScreen', {data: item})
              }>
              <Text style={{width: '50%', color: COLOR.black}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default HifzDailyReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  buttonContainer: {
    marginVertical: 5,
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistEachContainer: {
    flexDirection: 'row',
    height: 50,
    width: wp('100%'),
    // backgroundColor: '#ffa9a9',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
});
