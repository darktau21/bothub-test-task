export class InvalidRefreshTokenError extends Error {
  constructor(message: string = 'Invalid refresh token') {
    super(message);
  }
}
