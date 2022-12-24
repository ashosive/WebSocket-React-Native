import React, {useEffect, useState} from 'react';
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
import {StorageHandler} from './src/storage/StorageHandler';

const App = () => {
  let [url, setURL] = useState('pactreon.com');
  let saveURL = () => {
    let storageHandler = new StorageHandler();
    storageHandler.setValue('URL', url);
  };
  useEffect(() => {
    let storageHandler = new StorageHandler();
    storageHandler.getValue('URL').then(r => {
      console.log(r);
      setURL(r);
    });
  }, []);
  return (
    <SafeAreaView>
      <Text style={styles.sectionContainer}>Server URL</Text>
      <TextInput
        value={url}
        onChangeText={setURL}
        placeholder="Enter URL"
        style={styles.input}
      />
      <TouchableOpacity onPress={saveURL} style={styles.button}>
        <Text>Press Here</Text>
      </TouchableOpacity>
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
