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
const StudentEducation = ({route}) => {
  const {params} = route;
  const data = params ? params.data : null;
  const [className, setClassName] = useState(data ? data.class : '');
  const [date, setDate] = useState('');
  const [homeworkData, setHomeworkData] = useState({
    physics: null,
    computer: null,
    math: null,
    chemistry: null,
    english: null,
    urdu: null,
    islamiyat: null,
    pakSt: null,
    biology: null,
  });
  const [loading, setLoading] = useState(false);
  const year = date.slice(0, 4);
  const monthYear = date.slice(0, 7);

  const [physicsTestDate, setPhysicsTestDate] = useState(null);
  const [physicsTestObtainNumber, setPhysicsTestObtainNumber] = useState(null);
  const [physicsTestTotalNumber, setPhysicsTestTotalNumber] = useState(null);

  const [computerTestDate, setComputerTestDate] = useState(null);
  const [computerTestObtainNumber, setComputerTestObtainNumber] =
    useState(null);
  const [computerTestTotalNumber, setComputerTestTotalNumber] = useState(null);

  const [mathTestDate, setMathTestDate] = useState(null);
  const [mathTestObtainNumber, setMathTestObtainNumber] = useState(null);
  const [mathTestTotalNumber, setMathTestTotalNumber] = useState(null);

  const [chemistryTestDate, setChemistryTestDate] = useState(null);
  const [chemistryTestObtainNumber, setChemistryTestObtainNumber] =
    useState(null);
  const [chemistryTestTotalNumber, setChemistryTestTotalNumber] =
    useState(null);

  const [englishTestDate, setEnglishTestDate] = useState(null);
  const [englishTestObtainNumber, setEnglishTestObtainNumber] = useState(null);
  const [englishTestTotalNumber, setEnglishTestTotalNumber] = useState(null);

  const [urduTestDate, setUrduTestDate] = useState(null);
  const [urduTestObtainNumber, setUrduTestObtainNumber] = useState(null);
  const [urduTestTotalNumber, setUrduTestTotalNumber] = useState(null);

  const [islamiyatTestDate, setIslamiyatTestDate] = useState(null);
  const [islamiyatTestObtainNumber, setIslamiyatTestObtainNumber] =
    useState(null);
  const [islamiyatTestTotalNumber, setIslamiyatTestTotalNumber] =
    useState(null);

  const [pakStTestDate, setPakStTestDate] = useState(null);
  const [pakStTestObtainNumber, setPakStTestObtainNumber] = useState(null);
  const [pakStTestTotalNumber, setPakStTestTotalNumber] = useState(null);

  const [biologyTestDate, setBiologyTestDate] = useState(null);
  const [biologyTestObtainNumber, setBiologyTestObtainNumber] = useState(null);
  const [biologyTestTotalNumber, setBiologyTestTotalNumber] = useState(null);

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
    if (className) {
      const getLatestHomework = async () => {
        setLoading(true);
        try {
          const homeworkCollectionRef = collection(
            db,
            'Homework',
            className,
            'homeworkDetail',
          );
          const q = query(
            homeworkCollectionRef,
            where('class', '==', className),
            orderBy('date', 'desc'),
            limit(1),
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            ToastAndroid.show('Homework Retrieving ...', ToastAndroid.SHORT);
            const latestHomeworkDoc = querySnapshot.docs[0].data();
            console.log(latestHomeworkDoc);
            setHomeworkData({
              physics: latestHomeworkDoc.physics,
              computer: latestHomeworkDoc.computer,
              math: latestHomeworkDoc.math,
              chemistry: latestHomeworkDoc.chemistry,
              english: latestHomeworkDoc.english,
              urdu: latestHomeworkDoc.urdu,
              islamiyat: latestHomeworkDoc.islamiyat,
              pakSt: latestHomeworkDoc.pakSt,
              biology: latestHomeworkDoc.biology,
            });
          } else {
            ToastAndroid.show(
              'No homework found for the selected class.',
              ToastAndroid.SHORT,
            );
            setHomeworkData({
              physics: null,
              computer: null,
              math: null,
              chemistry: null,
              english: null,
              urdu: null,
              islamiyat: null,
              pakSt: null,
              biology: null,
            });
          }
        } catch (error) {
          console.error('Error fetching document: ', error);
        } finally {
          setLoading(false);
        }
      };

      getLatestHomework();
    }

    const getLatestChemistryTestReport = async () => {
      console.log('test report function ka upper wala hisa chal raha hy');
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'chemistry'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        console.log('test report function chal raha hy');
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setChemistryTestDate(latestTestReportDoc.date);
          setChemistryTestObtainNumber(latestTestReportDoc.obtainMarks);
          setChemistryTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(chemistryTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestPhysicsTestReport = async () => {
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'physics'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setPhysicsTestDate(latestTestReportDoc.date);
          setPhysicsTestObtainNumber(latestTestReportDoc.obtainMarks);
          setPhysicsTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(physicsTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestMathTestReport = async () => {
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'math'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setMathTestDate(latestTestReportDoc.date);
          setMathTestObtainNumber(latestTestReportDoc.obtainMarks);
          setMathTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(physicsTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestBiologyTestReport = async () => {
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'biology'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setBiologyTestDate(latestTestReportDoc.date);
          setBiologyTestObtainNumber(latestTestReportDoc.obtainMarks);
          setBiologyTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(physicsTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestEnglishTestReport = async () => {
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'english'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setEnglishTestDate(latestTestReportDoc.date);
          setEnglishTestObtainNumber(latestTestReportDoc.obtainMarks);
          setEnglishTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(physicsTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestComputerTestReport = async () => {
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'computer'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setComputerTestDate(latestTestReportDoc.date);
          setComputerTestObtainNumber(latestTestReportDoc.obtainMarks);
          setComputerTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(physicsTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestUrduTestReport = async () => {
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'urdu'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setUrduTestDate(latestTestReportDoc.date);
          setUrduTestObtainNumber(latestTestReportDoc.obtainMarks);
          setUrduTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(physicsTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestIslamiyatTestReport = async () => {
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'islamiyat'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setIslamiyatTestDate(latestTestReportDoc.date);
          setIslamiyatTestObtainNumber(latestTestReportDoc.obtainMarks);
          setIslamiyatTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(physicsTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    const getLatestPakStTestReport = async () => {
      try {
        const testReportCollectionRef = collection(
          db,
          'TestReport',
          className,
          'reports',
        );

        const q = query(
          testReportCollectionRef,
          where('subject', '==', 'pakSt'),
          where('name', '==', data.name),
          orderBy('date', 'desc'),
          limit(1),
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestTestReportDoc = querySnapshot.docs[0].data();
          console.log('Latest Test Report:', latestTestReportDoc);
          // Process or use the data as needed
          setPakStTestDate(latestTestReportDoc.date);
          setPakStTestObtainNumber(latestTestReportDoc.obtainMarks);
          setPakStTestTotalNumber(latestTestReportDoc.totalMarks);
          console.log(physicsTestObtainNumber);
        } else {
          console.log(
            'No test report found for the selected class and subject.',
          );
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

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

    getLatestChemistryTestReport();
    getLatestPhysicsTestReport();
    getLatestMathTestReport();
    getLatestBiologyTestReport();
    getLatestEnglishTestReport();
    getLatestComputerTestReport();
    getLatestUrduTestReport();
    getLatestIslamiyatTestReport();
    getLatestPakStTestReport();
    getLatestStudyStatus();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'EDUCATION'}
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/images/suffah-mono.png')}
      />
      <ScrollView style={styles.scrollView}>
        <View>
          {/* HOMEWORK CONTAINER */}
          <Text style={styles.heading}>HOMEWORK</Text>
          {loading ? (
            <ActivityIndicator size="large" color={COLOR.blue} />
          ) : (
            <>
              <TitleAndInput
                title={'PHYSICS'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.physics}
                readOnly={true}
              />
              <TitleAndInput
                title={'MATH'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.math}
                readOnly={true}
              />
              <TitleAndInput
                title={'COMPUTER'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.computer}
                readOnly={true}
              />
              <TitleAndInput
                title={'CHEMISTRY'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.chemistry}
                readOnly={true}
              />
              <TitleAndInput
                title={'BIOLOGY'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.biology}
                readOnly={true}
              />
              <TitleAndInput
                title={'ENGLISH'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.english}
                readOnly={true}
              />
              <TitleAndInput
                title={'URDU'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.urdu}
                readOnly={true}
              />
              <TitleAndInput
                title={'ISLAMIYAT'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.islamiyat}
                readOnly={true}
              />
              <TitleAndInput
                title={'PAK STUDIES'}
                icon={require('../../assets/icons/books.png')}
                placeholder={'No Homework Detail'}
                value={homeworkData.pakSt}
                readOnly={true}
              />
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
              {/* PHYSICS */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>PHYSICS</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{physicsTestDate}</Text>
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
                      {physicsTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>
                      {physicsTestTotalNumber}
                    </Text>
                  </View>
                </View>
              </View>

              {/* MATH */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>MATH</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{mathTestDate}</Text>
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
                      {mathTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>{mathTestTotalNumber}</Text>
                  </View>
                </View>
              </View>

              {/* CHEMISTRY */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>CHEMISTRY</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{chemistryTestDate}</Text>
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
                      {chemistryTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>
                      {chemistryTestTotalNumber}
                    </Text>
                  </View>
                </View>
              </View>

              {/* COMPUTER */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>COMPUTER</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{computerTestDate}</Text>
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
                      {computerTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>
                      {computerTestTotalNumber}
                    </Text>
                  </View>
                </View>
              </View>

              {/* BIOLOGY */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>BIOLOGY</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{biologyTestDate}</Text>
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
                      {biologyTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>
                      {biologyTestTotalNumber}
                    </Text>
                  </View>
                </View>
              </View>

              {/* ENGLISH */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>ENGLISH</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{englishTestDate}</Text>
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
                      {englishTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>
                      {englishTestTotalNumber}
                    </Text>
                  </View>
                </View>
              </View>

              {/* URDU */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>URDU</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{urduTestDate}</Text>
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
                      {urduTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>{urduTestTotalNumber}</Text>
                  </View>
                </View>
              </View>

              {/* ISLAMIYAT */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>ISLAMIYAT</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{islamiyatTestDate}</Text>
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
                      {islamiyatTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>
                      {islamiyatTestTotalNumber}
                    </Text>
                  </View>
                </View>
              </View>

              {/* PAK STUDIES */}
              <View style={styles.marksContainer}>
                <View style={styles.iconAndTitleContainer}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/icons/books.png')}
                  />
                  <Text style={styles.title}>PAK STUDIES</Text>
                </View>
                <View style={styles.dateAndMarksContainer}>
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.testDate}>{pakStTestDate}</Text>
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
                      {pakStTestObtainNumber}
                    </Text>
                    <Text style={{color: COLOR.black}}>/</Text>
                    <Text style={styles.testDate}>{pakStTestTotalNumber}</Text>
                  </View>
                </View>
              </View>
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
                readOnly={true}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentEducation;

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
  marksContainer: {
    marginVertical: 5,
  },
  iconAndTitleContainer: {
    width: wp('90%'),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  icon: {
    width: 24,
    height: 24,
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
});
