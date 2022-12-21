export class SocketConnectionException extends Error {
  constructor(message: string | undefined) {
    super(message); // (1)
    this.name = 'Socket Connection Exception'; // (2)
  }
}
