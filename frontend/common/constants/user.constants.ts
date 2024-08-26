import { UserRole } from '../types/user.types';

export const USER_ROLES: Record<UserRole, UserRole> = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  PUBLIC: 'PUBLIC',
};
