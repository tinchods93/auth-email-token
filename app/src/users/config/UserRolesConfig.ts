import { UserRolesEnum } from '../enums/UserRolesEnum';

export const userRolesConfig = {
  [UserRolesEnum.ADMIN]: {
    priority: 10,
  },
  [UserRolesEnum.USER]: {
    priority: 0,
  },
};
