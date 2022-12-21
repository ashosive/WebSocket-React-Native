export interface SocketHandlerInterface {
  checkInternetConnection: () => Promise<boolean>;
  server?: WebSocket;

  sendMessage: (message: string) => Promise<boolean>;
}
