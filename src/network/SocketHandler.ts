import {SocketHandlerInterface} from '../contract/SocketHandlerInterface';
import {SocketConnectionException} from '../exceptions/SocketConnectionException';
import NetInfo from '@react-native-community/netinfo';
import {NetworkException} from '../exceptions/NetworkException';

export class SocketHandler implements SocketHandlerInterface {
  server?: WebSocket;

  constructor() {
    this.checkInternetConnection().then(status => {
      if (status) {
        this.server = new WebSocket('ws://192.168.1.38:8080');
        this.server.onopen = () => {
          console.log('Connection established');
        };
        this.server.onerror = e => {
          throw new SocketConnectionException(e.message);
        };
      } else {
        throw new NetworkException('Network not available');
      }
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

  sendMessage(message: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.server.send(message);
    });
  }
}
