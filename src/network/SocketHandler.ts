import {SocketHandlerInterface} from '../contract/SocketHandlerInterface';
import {SocketConnectionException} from '../exceptions/SocketConnectionException';
import NetInfo from '@react-native-community/netinfo';
import {NetworkException} from '../exceptions/NetworkException';

export class SocketHandler implements SocketHandlerInterface {
  server?: WebSocket;

  constructor() {}
  openConnection(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.checkInternetConnection()
        .then(status => {
          if (status) {
            this.server = new WebSocket('ws://192.168.1.38:8080');
            this.server.onopen = () => {
              resolve(true);
            };
            this.server.onerror = e => {
              resolve(false);
              throw new SocketConnectionException(e.message);
            };
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
    this.server.send(message);
  }
}
