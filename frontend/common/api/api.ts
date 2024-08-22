import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
