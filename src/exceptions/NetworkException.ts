export class NetworkException extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = 'Network Exception';
  }
}
