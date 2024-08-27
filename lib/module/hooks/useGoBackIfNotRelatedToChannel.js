import { useCallback } from 'react';
import useGoBackNavigateToStartPage from './useGoBackOrNavigateToStartPage';
import { ChannelRepository } from '@amityco/ts-sdk-react-native';
import useCurrentUser from './useCurrentUser';
import { useFocusEffect } from '@react-navigation/native';
export default function useGoBackIfNotRelatedToChannel(channelId) {
  const goBack = useGoBackNavigateToStartPage();
  const [user, isFetched] = useCurrentUser();
  const onFocus = useCallback(() => {
    // @ts-ignore
    if (!isFetched || !user || channelId === '') return;
    const unsubscribe = ChannelRepository.Membership.getMembers({
      channelId,
      limit: 15
    }, ({
      loading,
      data,
      hasNextPage,
      onNextPage
    }) => {
      if (loading) return;
      const isInChannel = data.some(member => member.userId === user.userId);
      if (isInChannel) {
        return;
      }
      if (hasNextPage) {
        onNextPage();
        return;
      }
      if (!isInChannel) {
        goBack();
      }
    });
    return () => unsubscribe();
  }, [channelId, goBack, isFetched, user]);
  useFocusEffect(onFocus);
}
//# sourceMappingURL=useGoBackIfNotRelatedToChannel.js.map