'use client';
import { api } from '@/common/api';
import { fieldChangeHandler } from '@/common/utils';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

export const AuthForm: FC = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      await api.post('/auth/login', { username, password });
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <Field
            label='Username'
            type='text'
            value={username}
            onChange={fieldChangeHandler(setUsername)}
          />
          <Field
            label='Password'
            type='password'
            value={password}
            onChange={fieldChangeHandler(setPassword)}
          />
        </div>
        <Button type='submit' className='mt-4' loading={isSubmitting}>
          Login
        </Button>
      </form>
    </div>
  );
};
