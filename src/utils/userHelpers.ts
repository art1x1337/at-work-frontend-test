import type { User } from '../types/user';

export function mergeUser(baseUser: User, editedUser?: User): User {
  return editedUser ? { ...baseUser, ...editedUser } : baseUser;
}
