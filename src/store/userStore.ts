import { create } from "zustand";
import type { UserEntity, NewUser } from "../types/user";

interface UserStore {
  users: UserEntity[];
  nextId: number;
  addUser: (user: NewUser) => void;
  updateUser: (id: number, updatedFields: Partial<NewUser>) => void;
}

const initialUsers: UserEntity[] = [];

export const useUserStore = create<UserStore>((set) => ({
  users: initialUsers,
  nextId: 1,

  addUser: (user) =>
    set((state) => {
      const newUser: UserEntity = { ...user, id: state.nextId };
      return { users: [...state.users, newUser], nextId: state.nextId + 1 };
    }),
  updateUser: (id, updatedFields) =>
    set((state) => {
      const newUsers = state.users.map((user) =>
        user.id === id ? { ...user, ...updatedFields } : user
      );
      return { users: newUsers };
    }),
}));
