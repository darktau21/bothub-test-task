export class VerificationCodeError extends Error {
  constructor() {
    super('Verification code is invalid');
  }
}
