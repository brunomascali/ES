import api from './api';
import type { User } from '../types/User';

export async function login({ email, password }: { email: string, password: string }): Promise<User> {
  const response = await api.post('/login', { email, password });

  if (response.status === 403) {
    throw new Error('Usuário banido');
  }

  if (response.status === 401) {
    throw new Error('Email ou senha incorretos');
  }

  return response.data;
}

