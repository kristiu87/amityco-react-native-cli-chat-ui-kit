import { useContext } from 'react';
import useCurrentUser from './useCurrentUser';
import { RolesConfigContext } from '../providers/roles-config-provider';
export default function useIsRole(role) {
  var _user$roles;
  const [user, isFetched] = useCurrentUser();
  const roleConfig = useContext(RolesConfigContext);
  return [user === null || user === void 0 || (_user$roles = user.roles) === null || _user$roles === void 0 ? void 0 : _user$roles.includes(roleConfig[`${role}RoleId`]), isFetched];
}
//# sourceMappingURL=useIsRole.js.map