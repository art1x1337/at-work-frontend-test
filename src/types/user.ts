export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  companyName: string;
  avatar: string;
}

export type EditableUserFields = Pick<
  User,
  'name' | 'username' | 'email' | 'phone' | 'city' | 'companyName' | 'avatar'
>;