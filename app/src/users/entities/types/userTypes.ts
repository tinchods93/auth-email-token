import mongoose from 'mongoose';

export type UserItem = {
  email: string;
  creation_date: number;
  name?: string;
  role: string;
  email_verified: boolean;
};
export type UserModelItem = UserItem & {
  _id: mongoose.Schema.Types.ObjectId;
};

export type UserProfileType = UserItem & {
  _id: string;
};
