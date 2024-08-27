import { useContext } from 'react';
import { AuthContext } from '../providers/auth-provider';
const useAuth = () => {
  const {
    login,
    logout,
    client,
    isConnecting,
    isConnected,
    error,
    sessionState,
    apiRegion,
    language
  } = useContext(AuthContext);
  return {
    error,
    login,
    client,
    logout,
    isConnecting,
    isConnected,
    sessionState,
    language,
    apiRegion
  };
};
export default useAuth;
//# sourceMappingURL=useAuth.js.map