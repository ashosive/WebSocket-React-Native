import React, {useEffect, useState, useMemo} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SocketHandler} from '../core/network/SocketHandler';

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SendMessage = ({navigation}) => {
  const [message, setMessage] = useState('');
  const socketHandler = useMemo(() => new SocketHandler(), []);
  const [serverConnectionStatus, setServerConnectionStatus] = useState(false);
  const [messageArray, setMessageArray] = useState<any>([]);

  const showConnectionErrorAlert = () => {
    return Alert.alert('Server Connection failed', 'Please try again...', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('Connecting....')},
    ]);
  };

  const emptyMessageAlert = () => {
    return Alert.alert('Message is empty', 'Enter message and try again', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('Connecting....')},
    ]);
  };

  const sendMessage = () => {
    //validation for empty message
    if (message.trim().length !== 0) {
      socketHandler.sendMessage(message);
      setMessageArray([...messageArray, 'Sent: ' + message]);
      setMessage('');
    } else {
      emptyMessageAlert();
    }
  };

  useEffect(() => {
    if (serverConnectionStatus) {
      socketHandler.onMessage(function (serverMessage) {
        console.log('Received: ' + serverMessage);
        setMessageArray([...messageArray, 'Received: ' + serverMessage]);
      });
    }
  }, [messageArray, serverConnectionStatus, socketHandler]);

  const getMessageDisplayList = () => {
    if (messageArray.length > 0) {
      // @ts-ignore
      return messageArray.map((item, index) => (
        <Text style={styles.sectionContainer} key={index}>
          {item}
        </Text>
      ));
    }
  };

  useEffect(() => {
    socketHandler.openConnection().then(response => {
      if (response) {
        setServerConnectionStatus(true);
      } else {
        setServerConnectionStatus(false);
        showConnectionErrorAlert();
      }
    });
  }, [socketHandler]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollViewStyle}>
        {getMessageDisplayList()}
      </ScrollView>
      <View style={styles.bottomView}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Enter Message"
          style={styles.input}
        />
        <TouchableOpacity
          disabled={!serverConnectionStatus}
          onPress={sendMessage}
          style={styles.button}>
          <Text style={{fontSize: 17}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollViewStyle: {
    flexDirection: 'column',
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    color: '#000000',
    fontSize: 17,
  },
  bottomView: {
    flexDirection: 'column',

    bottom: 0,
    right: 0,
    left: 0,
  },
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#000000',
  },
  button: {
    backgroundColor: '#000000',
    width: '100%',
    height: 50,
    // borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SendMessage;
