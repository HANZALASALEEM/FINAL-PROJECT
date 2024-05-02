import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import COLOR from '../../assets/color/Color';
import DropDownPicker from 'react-native-dropdown-picker';
import TitleAndInput from '../../components/TitleAndInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const TeacherEducation = () => {
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
        title={'EDUCATION'}
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/images/suffah-mono.png')}
      />
     
   <View style={styles.rowOptionContainer}>
<View style={styles.optionContainer}></View><View style={styles.optionContainer}></View>
   </View>
      
    </View>
  );
};

export default TeacherEducation;

const styles = StyleSheet.create({ 
  container: {
  flex: 1,
  backgroundColor: COLOR.white,
},
rowOptionContainer:{
  height:hp("15%"),
  width:wp("95%"),
  backgroundColor:"red",
  alignSelf:"center",
  marginTop:20,
  flexDirection:"row",
},
optionContainer:{
  width:"35%",
},
});
