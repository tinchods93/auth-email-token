import mongoose from 'mongoose';

export type UserModelItem = {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  creation_date: number;
  name?: string;
  role: string;
  email_verified: boolean;
};

export type UserItem = Omit<UserModelItem, '_id'>;

export type UserProfileType = Omit<UserModelItem, 'password'>;
