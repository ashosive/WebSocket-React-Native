import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {SocketHandler} from '../core/network/SocketHandler';

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Register = ({navigation}) => {
  const socketHandler = useMemo(() => new SocketHandler(), []);
  const [serverConnectionStatus, setServerConnectionStatus] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // const deviceInfo = DeviceInfo.getDeviceId();
  // console.log(deviceInfo);

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

  const showMessageSentAlert = () => {
    return Alert.alert('Details sent successfully', 'Thank you!', [
      {text: 'OK', onPress: () => navigation.navigate('Home')},
    ]);
  };

  const sendUserDetails = () => {
    if (serverConnectionStatus) {
      const getUniqueId = DeviceInfo.getUniqueId();
      const data = {
        name: name,
        email: email,
        uniqueId: getUniqueId,
      };
      const userRegistrationDetails = JSON.stringify(data);
      // @ts-ignore
      socketHandler.sendMessage(userRegistrationDetails);
      setEmail('');
      setName('');
      showMessageSentAlert();
    } else {
      console.log('connection not available');
    }
  };

  useEffect(() => {
    socketHandler.openConnection().then(response => {
      console.log('connection status', response);
      if (response) {
        setServerConnectionStatus(true);
      } else {
        setServerConnectionStatus(false);
        showConnectionErrorAlert();
      }
    });
  }, [socketHandler]);
  return (
    <SafeAreaView>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />

      <TouchableOpacity onPress={sendUserDetails} style={styles.button}>
        <Text>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#343434',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#343434',
    padding: 10,
    // flex: 1,
    // justifyContent: 'flex-end',
  },
});

export default Register;
