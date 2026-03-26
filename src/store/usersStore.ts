import { create } from 'zustand';
import type { EditableUserFields, User } from '../types/user';

type UserPatch = Partial<EditableUserFields>;

type UsersStore = {
  archivedIds: number[];
  hiddenIds: number[];
  updatedUsers: Record<number, UserPatch>;
  archiveUser: (id: number) => void;
  activateUser: (id: number) => void;
  hideUser: (id: number) => void;
  updateUser: (id: number, payload: UserPatch) => void;
  getMergedUser: (user: User) => User;
};

const withoutId = (ids: number[], targetId: number) => ids.filter((id) => id !== targetId);

export const useUsersStore = create<UsersStore>((set, get) => ({
  archivedIds: [],
  hiddenIds: [],
  updatedUsers: {},
  archiveUser: (id) =>
    set((state) => ({
      archivedIds: state.archivedIds.includes(id) ? state.archivedIds : [...state.archivedIds, id],
      hiddenIds: withoutId(state.hiddenIds, id),
    })),
  activateUser: (id) =>
    set((state) => ({
      archivedIds: withoutId(state.archivedIds, id),
    })),
  hideUser: (id) =>
    set((state) => ({
      hiddenIds: state.hiddenIds.includes(id) ? state.hiddenIds : [...state.hiddenIds, id],
      archivedIds: withoutId(state.archivedIds, id),
    })),
  updateUser: (id, payload) =>
    set((state) => ({
      updatedUsers: {
        ...state.updatedUsers,
        [id]: {
          ...state.updatedUsers[id],
          ...payload,
        },
      },
    })),
  getMergedUser: (user) => {
    const patch = get().updatedUsers[user.id];
    return patch ? { ...user, ...patch } : user;
  },
}));
