import { FormEvent } from 'react';

export const fieldChangeHandler =
  (handler: (value: string) => void) => (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    return handler(target.value);
  };
