export type AuthCodeModelItemType = {
  _id: string;
  email: string;
  auth_code: string;
  used: boolean;
};

export type AuthCodeItemNoIdType = Omit<AuthCodeModelItemType, '_id'>;
