import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StorageHandler} from '../core/storage/StorageHandler';
import {SocketHandler} from '../core/network/SocketHandler';

// @ts-ignore
const HomeScreen = ({navigation}) => {
  const DEFAULT_URL = 'ws://192.168.1.50:8080';
  useEffect(() => {
    let storageHandler = new StorageHandler();
    storageHandler.getValue('URL').then(result => {
      if (result === null) {
        console.log('URL doesnot exists');
        storageHandler.setValue('URL', DEFAULT_URL);
      } else {
        console.log('URL Already Exists', DEFAULT_URL);
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}
        style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Send Message');
        }}
        style={styles.button}>
        <Text style={styles.text}>Send Message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Settings');
        }}
        style={styles.button}>
        <Text style={styles.text}>Settings</Text>
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
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#343434',
    padding: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 17,
  },
});

export default HomeScreen;
