import axios from 'axios';
import { toast } from '@/components/shadcn/ui/use-toast';

const isServer = typeof window === 'undefined';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
    } else {
      if (!isServer) {
        if (!error.config.ignoreErrors) {
          const message =
            error.response?.data?.message || 'Something went wrong';
          toast({
            title: 'Error',
            description: message,
            variant: 'destructive',
          });
        }
      }
    }
    return Promise.reject(error);
  }
);
