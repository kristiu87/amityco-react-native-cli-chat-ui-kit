import { ChannelRepository, UserRepository } from '@amityco/ts-sdk-react-native';
import { useContext, useEffect, useState } from 'react';
import { RolesConfigContext } from '../providers/roles-config-provider';
export default function useCanChat(channelId) {
  const [canChat, setCanChat] = useState(false);
  const roleConfig = useContext(RolesConfigContext);
  useEffect(() => {
    const unsubscribe = ChannelRepository.Membership.getMembers({
      channelId,
      limit: 15
    }, async ({
      loading,
      data,
      hasNextPage,
      onNextPage
    }) => {
      if (loading) return;
      const {
        data: users
      } = await UserRepository.getUserByIds(data.map(member => member.userId));
      console.log(users);
      const hasCS = users.some(user => user.roles.includes(roleConfig.customerServiceRoleId));
      if (hasCS) {
        setCanChat(true);
        return;
      }
      if (hasNextPage) {
        onNextPage();
        return;
      }
    });
    return () => unsubscribe();
  }, [channelId, roleConfig]);
  return canChat;
}
//# sourceMappingURL=useCanChat.js.map