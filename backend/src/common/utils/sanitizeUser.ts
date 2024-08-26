import { User } from '@prisma/client';
import { SanitizedUser } from '../types/user.types';

export const sanitizeUser = (user: User): SanitizedUser => {
  const { id, username, role } = user;
  return { id, username, role };
};
