export interface SocketHandlerInterface {
  openConnection: () => Promise<boolean>;
  checkInternetConnection: () => Promise<boolean>;
  server?: WebSocket;

  sendMessage: (message: string) => void;
  onMessage: (callback: (value: string) => void) => void;
}
