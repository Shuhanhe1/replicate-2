import { FormEvent } from 'react';

export const extractInputValue = (event: FormEvent<HTMLInputElement>) => {
  const target = event.target as HTMLInputElement;
  return target.value;
};
