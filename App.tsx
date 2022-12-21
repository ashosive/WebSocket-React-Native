import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {SocketHandler} from './src/network/SocketHandler';

const App = () => {
  useEffect(() => {
    try {
      let handler = new SocketHandler();
      handler.openConnection().then(status => {
        if (status) {
          handler.sendMessage('Hello gggg');
        } else {
          console.log('Connection Failed');
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <SafeAreaView>
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#343434',
    padding: 10,
  },
});

export default App;
