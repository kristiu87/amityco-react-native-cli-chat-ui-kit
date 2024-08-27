import { useContext } from 'react';
import useCurrentUser from './useCurrentUser';
import { RolesConfigContext } from '../providers/roles-config-provider';

export default function useIsRole(role: 'vipUser' | 'customerService') {
  const [user, isFetched] = useCurrentUser();
  const roleConfig = useContext(RolesConfigContext);

  return [
    user?.roles?.includes(roleConfig[`${role}RoleId`]),
    isFetched,
  ] as const;
}
