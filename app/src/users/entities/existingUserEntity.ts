import { UserItem, UserProfile } from './types/userTypes';

export default class ExistingUserEntity {
  private id: string;

  private email: string;

  private creation_date: number;

  private role: string;

  constructor(input: UserItem) {
    this.id = input.id;
    this.email = input.email;
    this.creation_date = input.creation_date;
    this.role = input.role;
  }

  get(): UserProfile {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      creation_date: this.creation_date,
    };
  }
}
