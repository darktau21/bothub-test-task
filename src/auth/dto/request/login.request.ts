import { OmitType } from '@nestjs/swagger';

import { RegisterRequest } from './register.request';

export class LoginRequest extends OmitType(RegisterRequest, ['email']) {}
