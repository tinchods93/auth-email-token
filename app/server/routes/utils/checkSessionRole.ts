import { userRolesConfig } from '../../../src/users/config/UserRolesConfig';

function checkSessionRole(role: string, baseRole: any) {
  return userRolesConfig[role].priority >= baseRole.priority;
}

export default checkSessionRole;
