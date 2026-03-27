import { create } from 'zustand';
import type { User } from '../types/user';

interface UsersUiState {
  archivedIds: number[];
  hiddenIds: number[];
  editedUsers: Record<number, User>;
  toggleArchive: (id: number) => void;
  hideUser: (id: number) => void;
  saveEditedUser: (user: User) => void;
}

export const useUsersUiStore = create<UsersUiState>((set) => ({
  archivedIds: [],
  hiddenIds: [],
  editedUsers: {},
  toggleArchive: (id) =>
    set((state) => ({
      archivedIds: state.archivedIds.includes(id)
        ? state.archivedIds.filter((currentId) => currentId !== id)
        : [...state.archivedIds, id],
    })),
  hideUser: (id) =>
    set((state) => ({
      hiddenIds: state.hiddenIds.includes(id) ? state.hiddenIds : [...state.hiddenIds, id],
    })),
  saveEditedUser: (user) =>
    set((state) => ({
      editedUsers: {
        ...state.editedUsers,
        [user.id]: user,
      },
    })),
}));
