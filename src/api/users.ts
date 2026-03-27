import { getUserAvatar } from '../utils/avatars';
import type { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com';

interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

function mapUser(user: ApiUser): User {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    city: user.address.city,
    companyName: user.company.name,
    avatar: getUserAvatar(user.id),
  };
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить данные');
  }

  return response.json() as Promise<T>;
}

export async function fetchUsers(): Promise<User[]> {
  const users = await request<ApiUser[]>('/users');
  return users.slice(0, 6).map(mapUser);
}

export async function fetchUserById(id: number): Promise<User> {
  const user = await request<ApiUser>(`/users/${id}`);
  return mapUser(user);
}
