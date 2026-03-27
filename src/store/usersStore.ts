import { create } from 'zustand';
import type { EditableUserFields } from '../types/user';

type UsersStore = {
  archivedIds: number[];
  hiddenIds: number[];
  editedUsers: Record<number, EditableUserFields>;

  archiveUser: (id: number) => void;
  restoreUser: (id: number) => void;
  hideUser: (id: number) => void;
  saveUserChanges: (id: number, data: EditableUserFields) => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
  archivedIds: [],
  hiddenIds: [],
  editedUsers: {},

  archiveUser: (id) =>
    set((state) => ({
      archivedIds: state.archivedIds.includes(id)
        ? state.archivedIds
        : [...state.archivedIds, id],
    })),

  restoreUser: (id) =>
    set((state) => ({
      archivedIds: state.archivedIds.filter((item) => item !== id),
    })),

  hideUser: (id) =>
    set((state) => ({
      hiddenIds: state.hiddenIds.includes(id)
        ? state.hiddenIds
        : [...state.hiddenIds, id],
    })),

  saveUserChanges: (id, data) =>
    set((state) => ({
      editedUsers: {
        ...state.editedUsers,
        [id]: data,
      },
    })),
}));