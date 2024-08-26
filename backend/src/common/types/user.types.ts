import { User } from '@prisma/client';

export type SanitizedUser = Pick<User, 'id' | 'username' | 'role'>;

export interface UserAccessTokenData extends Omit<SanitizedUser, 'id'> {
  sub: string;
}
