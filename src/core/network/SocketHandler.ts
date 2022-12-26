import {SocketHandlerInterface} from '../contract/SocketHandlerInterface';
import {SocketConnectionException} from '../../exceptions/SocketConnectionException';
import NetInfo from '@react-native-community/netinfo';
import {NetworkException} from '../../exceptions/NetworkException';
import {StorageHandler} from '../storage/StorageHandler';

export class SocketHandler implements SocketHandlerInterface {
  server?: WebSocket;

  constructor() {}
  openConnection(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.checkInternetConnection()
        .then(internetStatus => {
          if (internetStatus) {
            let storageHandler = new StorageHandler();
            storageHandler.getValue('URL').then(result => {
              let URL = result;
              if (URL === null) {
                resolve(false);
              } else {
                this.server = new WebSocket(URL);
                this.server.onopen = () => {
                  resolve(true);
                };
                this.server.onerror = e => {
                  resolve(false);
                  throw new SocketConnectionException(e.message);
                };
              }
            });
          } else {
            resolve(false);
            throw new NetworkException('Network not available');
          }
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  checkInternetConnection(): Promise<boolean> {
    return NetInfo.fetch().then(state => {
      return new Promise<boolean>(resolve => {
        if (state.isConnected === true) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  sendMessage(message: string): void {
    // @ts-ignore
    this.server.send(message);
  }

  onMessage(callback: (value: string) => void): void {
    // @ts-ignore
    this.server.onmessage = e => {
      console.log(e.data);
      callback(e.data);
    };
  }
}
