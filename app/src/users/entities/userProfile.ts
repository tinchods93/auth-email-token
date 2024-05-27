import mongoose from 'mongoose';
import { UserModelItem, UserProfileType } from './types/userTypes';

export default class UserProfile {
  private _id: mongoose.Schema.Types.ObjectId;

  private email: string;

  private creation_date: number;

  private role: string;

  private email_verified: boolean;

  constructor(input: UserModelItem) {
    this._id = input._id;
    this.email = input.email;
    this.creation_date = input.creation_date;
    this.role = input.role;
    this.email_verified = input.email_verified;
  }

  get(): UserProfileType {
    return {
      _id: this._id,
      email: this.email,
      role: this.role,
      creation_date: this.creation_date,
      email_verified: this.email_verified,
    };
  }
}
