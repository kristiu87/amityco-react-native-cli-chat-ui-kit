import { useMemo } from 'react';
import { Permissions } from './../constants';
import useAuth from './../hooks/useAuth';
export const useChannelPermission = targetId => {
  const {
    client
  } = useAuth();
  const hasChannelPermission = useMemo(() => {
    const channelPermission = client === null || client === void 0 ? void 0 : client.hasPermission(Permissions.AddChannelUserPermission).channel(targetId);
    channelPermission;
    return channelPermission;
  }, [client, targetId]);
  return hasChannelPermission;
};
//# sourceMappingURL=useChannelPermission.js.map