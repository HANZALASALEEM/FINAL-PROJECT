import * as GoogleGenerativeAI from '@google/generative-ai';
import {View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import Navbar from '../../../components/Navbar';
import COLOR from '../../../assets/color/Color';
import {useNavigation} from '@react-navigation/native';
const GeminiChat = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [outputMessage, setOutputMessage] = useState(
    'Results should be shown here.',
  );
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const API_KEY = 'AIzaSyCQ1Xvl5P9tbo8MeR1EZOvZDUXZQYBhG64';

  const renderMessage = props => {
    const {currentMessage} = props;

    if (currentMessage.user._id === 1) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: COLOR.blue,
                marginRight: 12,
                marginVertical: 12,
              },
            }}
            textStyle={{
              right: {
                color: 'white',
              },
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Image
            source={require('../../../assets/images/suffah-mono.png')}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              marginLeft: 8,
            }}
          />
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#F7F7F8',
                marginLeft: 12,
              },
            }}
            textStyle={{
              left: {
                color: 'black',
              },
            }}
          />
        </View>
      );
    }

    return <Bubble {...props} />;
  };

  const generateText = async () => {
    setIsTyping(true);
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: {_id: 1},
    };

    setMessages(previousMessage =>
      GiftedChat.append(previousMessage, [message]),
    );
    const userMessage = {text: inputMessage, user: true};
    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: 'gemini-pro'});
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const apiMessage = text;
    setInputMessage('');
    setOutputMessage(apiMessage);

    const newMessage = {
      _id: Math.random().toString(36).substring(7),
      text: apiMessage,
      createdAt: new Date(),
      user: {_id: 2, name: 'ChatGPT'},
    };

    setIsTyping(false);
    setMessages(previousMessage =>
      GiftedChat.append(previousMessage, [newMessage]),
    );
  };

  const submitHandler = () => {
    generateText();
  };

  const handleInputText = text => {
    setInputMessage(text);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar backgroundColor={COLOR.blue} />
      <Navbar
        title={'AI TEACHER'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        onPressRightIcon={() => {
          console.log('Right Icon Pressed');
        }}
        leftIcon={require('../../../assets/icons/left-arrow.png')}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{_id: 1}}
          minInputToolbarHeight={0}
          renderMessage={renderMessage}
          isTyping={isTyping}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLOR.white,
          paddingVertical: 8,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            backgroundColor: '#f4f4f8',
            paddingVertical: 8,
            marginHorizontal: 12,
            borderRadius: 12,
            borderColor: 'gray',
            borderWidth: 0.2,
          }}>
          <TextInput
            value={inputMessage}
            onChangeText={handleInputText}
            placeholder="Clear your science concepts"
            placeholderTextColor="gray"
            style={{
              color: 'gray',
              flex: 1,
              paddingHorizontal: 10,
            }}
          />

          <TouchableOpacity
            onPress={submitHandler}
            style={{
              padding: 6,
              borderRadius: 8,
              marginHorizontal: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../assets/icons/send.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default GeminiChat;
