export class PasswordCompareError extends Error {
  constructor(message: string = 'Password did not match') {
    super(message);
  }
}
