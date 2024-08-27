import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { UserRepository } from '@amityco/ts-sdk-react-native';

/**
 * @example
 * ```ts
 * const [user, isFetched] = useCurrentUser()
 *
 * user.roles // ["b78323a5-ec93-4ad6-87b8-1a87760f8346"]
 * ```
 */
function useCurrentUser() {
  const {
    client
  } = useAuth();
  const [user, setUser] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  // @ts-ignore
  useEffect(() => {
    const userId = client === null || client === void 0 ? void 0 : client.userId;
    if (userId) {
      const unsubscribe = UserRepository.getUser(userId, ({
        loading,
        data
      }) => {
        if (!loading) {
          setUser(data);
          setIsFetched(true);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [client]);
  return [user, isFetched];
}
export default useCurrentUser;
//# sourceMappingURL=useCurrentUser.js.map