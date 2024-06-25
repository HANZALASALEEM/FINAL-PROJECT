import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navbar from '../../components/Navbar';
import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import {db} from '../../firebase/firebase.config';
import TitleAndInput from '../../components/TitleAndInput';
import COLOR from '../../assets/color/Color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const StudentHifz = ({route}) => {
  const {params} = route;
  const data = params ? params.data : null;
  const [className, setClassName] = useState(data ? data.class : '');
  const [date, setDate] = useState('');
  const [testReportData, setTestReportData] = useState([]);

  const [loading, setLoading] = useState(false);
  const year = date.slice(0, 4);
  const monthYear = date.slice(0, 7);

  const [sabaqStatus, setSabaqStatus] = useState(0);
  const [sabaqiStatus, setSabaqiStatus] = useState(0);
  const [manzilStatus, setManzilStatus] = useState(0);
  const [sabaqLines, setSabaqLines] = useState(0);
  const [sabaqiParaNumber, setSabaqiParaNumber] = useState(0);
  const [manzilParaNumber, setManzilParaNumber] = useState(0);

  const [studyStatus, setStudyStatus] = useState(null);

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setDate(getCurrentDate());
  }, []);

  useEffect(() => {
    const getLatestStudyStatus = async () => {
      try {
        const studyStatusCollectionRef = collection(
          db,
          'Student',
          data.studentCNIC,
          'studyStatus',
        );

        const q = query(
          studyStatusCollectionRef,

          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestStudyStatusDoc = querySnapshot.docs[0].data();
          console.log('Latest Study Status:', latestStudyStatusDoc);
          // Process or use the data as needed
          setStudyStatus(latestStudyStatusDoc.status);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestDailyReport = async () => {
      try {
        const DailyReportCollectionRef = collection(
          db,
          'Student',
          data.studentCNIC,
          'dailyReport',
        );

        const q = query(
          DailyReportCollectionRef,
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestDailyReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Study Status:', latestDailyReportDoc);
          // Process or use the data as needed
          setManzilParaNumber(latestDailyReportDoc.manzilParaNumber);
          setManzilStatus(latestDailyReportDoc.manzilStatus);
          setSabaqLines(latestDailyReportDoc.sabaqLines);
          setSabaqStatus(latestDailyReportDoc.sabaqStatus);
          setSabaqiParaNumber(latestDailyReportDoc.sabaqiParaNumber);
          setSabaqiStatus(latestDailyReportDoc.sabaqiStatus);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getTestReportData = async () => {
      try {
        const q = query(
          collection(db, 'Student', data.studentCNIC, 'TestReport'),
          orderBy('date', 'desc'),
          limit(4),
        );
        const querySnapshot = await getDocs(q);
        const testReports = [];
        querySnapshot.forEach(doc => {
          testReports.push({id: doc.id, ...doc.data()});
        });
        setTestReportData(testReports);
        console.log(testReportData);
      } catch (error) {
        console.error('Error fetching test reports:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    getLatestDailyReport();
    getTestReportData();
    getLatestStudyStatus();
  }, []);

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
      <ScrollView style={styles.scrollView}>
        <View>
          {/* HOMEWORK CONTAINER */}
          <Text style={styles.heading}>DAILY REPORT</Text>
          {loading ? (
            <ActivityIndicator size="large" color={COLOR.blue} />
          ) : (
            <>
              <View style={styles.reportContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.title, {color: COLOR.red}]}>کمزور</Text>
                  <Image
                    source={
                      sabaqStatus == -1
                        ? require('../../assets/icons/radio-red-fill.png')
                        : require('../../assets/icons/radio-red-outline.png')
                    }
                    style={styles.icon}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.title, {color: COLOR.green}]}>بہتر</Text>
                  <Image
                    source={
                      sabaqStatus == 1
                        ? require('../../assets/icons/radio-green-fill.png')
                        : require('../../assets/icons/radio-green-outline.png')
                    }
                    style={styles.icon}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.title,
                      {color: COLOR.lightBlue, marginLeft: 5},
                    ]}>
                    {sabaqLines}
                  </Text>
                  <Text
                    style={[styles.title, {color: COLOR.blue, marginLeft: 5}]}>
                    لائنوں کی مقدار
                  </Text>
                </View>
                <Text
                  style={[
                    styles.title,
                    {
                      color: COLOR.blue,
                      marginLeft: 5,
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                  ]}>
                  سبق
                </Text>
              </View>
              <View style={styles.reportContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.title, {color: COLOR.red}]}>کمزور</Text>
                  <Image
                    source={
                      sabaqiStatus == -1
                        ? require('../../assets/icons/radio-red-fill.png')
                        : require('../../assets/icons/radio-red-outline.png')
                    }
                    style={styles.icon}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.title, {color: COLOR.green}]}>بہتر</Text>
                  <Image
                    source={
                      sabaqiStatus == 1
                        ? require('../../assets/icons/radio-green-fill.png')
                        : require('../../assets/icons/radio-green-outline.png')
                    }
                    style={styles.icon}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[styles.title, {color: COLOR.blue, marginLeft: 5}]}>
                    {sabaqiParaNumber}
                  </Text>
                  <Text
                    style={[styles.title, {color: COLOR.blue, marginLeft: 5}]}>
                    پارہ نمبر
                  </Text>
                </View>
                <Text
                  style={[
                    styles.title,
                    {
                      color: COLOR.blue,
                      marginLeft: 5,
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                  ]}>
                  سبقی
                </Text>
              </View>
              <View style={styles.reportContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.title, {color: COLOR.red}]}>کمزور</Text>
                  <Image
                    source={
                      manzilStatus == -1
                        ? require('../../assets/icons/radio-red-fill.png')
                        : require('../../assets/icons/radio-red-outline.png')
                    }
                    style={styles.icon}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.title, {color: COLOR.green}]}>بہتر</Text>
                  <Image
                    source={
                      manzilStatus == 1
                        ? require('../../assets/icons/radio-green-fill.png')
                        : require('../../assets/icons/radio-green-outline.png')
                    }
                    style={styles.icon}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[styles.title, {color: COLOR.blue, marginLeft: 5}]}>
                    {manzilParaNumber}
                  </Text>
                  <Text
                    style={[styles.title, {color: COLOR.blue, marginLeft: 5}]}>
                    پارہ نمبر
                  </Text>
                </View>
                <Text
                  style={[
                    styles.title,
                    {
                      color: COLOR.blue,
                      marginLeft: 5,
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                  ]}>
                  منزل
                </Text>
              </View>
            </>
          )}
        </View>

        {/* TEST REPORT CONTAINER */}
        <View>
          <Text style={styles.heading}>TEST REPORT</Text>
          {loading ? (
            <ActivityIndicator size="large" color={COLOR.blue} />
          ) : (
            <>
              <FlatList
                horizontal
                data={testReportData}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View style={styles.dateAndMarksContainer}>
                    <View
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.testDate}>{item.date}</Text>
                    </View>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginHorizontal: 3,
                      }}>
                      <Text style={[styles.testDate, {color: COLOR.lightBlue}]}>
                        {item.obtainMarks}
                      </Text>
                      <Text style={{color: COLOR.black}}>/</Text>
                      <Text style={styles.testDate}>{item.totalMarks}</Text>
                    </View>
                  </View>
                )}
              />
            </>
          )}
        </View>

        {/* TEACHER's REVIEW CONTAINER */}
        <View>
          <Text style={styles.heading}>TEACHER's REVIEW</Text>
          {loading ? (
            <ActivityIndicator size="large" color={COLOR.blue} />
          ) : (
            <>
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder="Teacher's review about your child..."
                placeholderTextColor="gray"
                value={studyStatus}
                // readOnly={true}
                numberOfLines={3}
                // editable={false}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentHifz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollView: {},
  heading: {
    color: COLOR.blue,
    fontFamily: 'times new roman',
    fontSize: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    margin: 25,
  },

  title: {
    fontSize: 14,
    color: COLOR.blue,
    fontFamily: 'times new roman',
    marginLeft: 5,
  },
  dateAndMarksContainer: {
    height: 50,
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLOR.lightBlue, // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7, // Shadow opacity (0 to 1)
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5,
    borderColor: COLOR.gray,
    borderWidth: 0.5,
    flexDirection: 'row',
    marginHorizontal: 7,
  },
  testDate: {
    fontSize: 18,
    color: COLOR.blue,
    fontFamily: 'times new roman',
    marginLeft: 5,
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
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  reportContainer: {
    height: 50,
    width: wp('95%'),
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: COLOR.black, // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7, // Shadow opacity (0 to 1)
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5,
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
