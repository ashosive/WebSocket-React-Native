import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {StorageHandler} from '../core/storage/StorageHandler';

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Settings = ({navigation}) => {
  const DEFAULT_URL = 'ws://192.168.1.50:8080';
  let [url, setURL] = useState(DEFAULT_URL);
  let saveURL = () => {
    let storageHandler = new StorageHandler();
    storageHandler.setValue('URL', url);
  };
  useEffect(() => {
    let storageHandler = new StorageHandler();
    storageHandler.getValue('URL').then(r => {
      console.log(r);
      // @ts-ignore
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
        <Text>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    color: '#343434',
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
  },
});

export default Settings;
