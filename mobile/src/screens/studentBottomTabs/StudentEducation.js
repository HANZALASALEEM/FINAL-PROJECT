import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
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
          const monthYear = date.slice(0, 7);
          const homeworkCollectionRef = collection(
            db,
            'Homework',
            year,
            monthYear,
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
  }, [className]);

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
        <View>
          <Text style={styles.heading}>TEST REPORT</Text>
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
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    margin: 25,
  },
});
