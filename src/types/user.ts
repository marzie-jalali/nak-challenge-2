export interface UserEntity {
    id: number;
    name: string;
    userName: string;
    email: string;
    phone: string;
    status: 'active' | 'not_active' | null;
  }

  export type NewUser = Omit<UserEntity, 'id'>;