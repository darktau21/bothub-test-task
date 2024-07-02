import type { Role } from '@prisma/client';

export interface IJwtTokenData {
  id: number;
  role: Role;
}
