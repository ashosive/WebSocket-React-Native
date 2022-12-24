import {StorageHandlerInterface} from './StorageHandlerInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageHandler implements StorageHandlerInterface {
  async getValue(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }
  async setValue(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
  }
}
