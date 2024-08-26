export type UserRole = 'ADMIN' | 'USER' | 'PUBLIC';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}
