import mongoose from 'mongoose';

export type UserItem = {
  id: mongoose.Schema.Types.UUID;
  email: string;
  password: string;
  creation_date: number;
  name?: string;
  role: string;
};

export type UserProfile = Omit<UserItem, 'password'>;
