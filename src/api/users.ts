import type { ApiUser, User } from '../types/user';
import { createAvatarDataUri } from '../utils/avatar';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const mapUser = (user: ApiUser): User => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  city: user.address.city,
  phone: user.phone,
  companyName: user.company.name,
  avatarUrl: createAvatarDataUri(user.username),
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(USERS_URL);

  if (!response.ok) {
    throw new Error('Не удалось получить список пользователей');
  }

  const data = (await response.json()) as ApiUser[];
  return data.slice(0, 6).map(mapUser);
};
