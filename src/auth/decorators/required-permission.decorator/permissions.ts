import { Role } from '@prisma/client';

export const PERMISSIONS = {
  ADD_BOOK: 1 << 0, // 0001
  CHANGE_USER_ROLE: 1 << 3, // 1000
  DELETE_BOOK: 1 << 2, // 0100
  UPDATE_BOOK: 1 << 1, // 0010
};

export const ROLES_PERMISSIONS: Record<Role, number> = {
  [Role.ADMIN]:
    PERMISSIONS.ADD_BOOK |
    PERMISSIONS.UPDATE_BOOK |
    PERMISSIONS.DELETE_BOOK |
    PERMISSIONS.CHANGE_USER_ROLE,
  [Role.USER]: 0,
};
