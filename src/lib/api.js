import axios from 'axios';
import { env } from '@/lib/env';

const token = JSON.parse(localStorage.getItem('auth-storage'))?.state.token;

export const _http = axios.create({
  baseURL: env.API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
