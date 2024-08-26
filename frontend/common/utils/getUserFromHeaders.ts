import { headers } from 'next/headers';
import { User } from '../types';

export const getUserFromHeaders = (): User | null => {
  const parsed = JSON.parse(headers().get('user') || 'null');

  return parsed?.username ? parsed : null;
};
