/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Client } from '@amityco/ts-sdk-react-native';
import { Alert } from 'react-native';
export const AuthContext = /*#__PURE__*/React.createContext({
  client: {},
  isConnecting: false,
  error: '',
  login: () => {},
  logout: () => {},
  isConnected: false,
  sessionState: '',
  apiRegion: 'sg',
  authToken: '',
  language: 'en'
});
export const AuthContextProvider = ({
  userId,
  displayName,
  apiKey,
  apiRegion,
  apiEndpoint,
  children,
  authToken,
  language
}) => {
  const [error, setError] = useState('');
  const [isConnecting, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionState, setSessionState] = useState('');
  const client = Client.createClient(apiKey, apiRegion, {
    apiEndpoint: {
      http: apiEndpoint
    }
  });
  const sessionHandler = {
    sessionWillRenewAccessToken(renewal) {
      renewal.renew();
    }
  };
  useEffect(() => {
    return Client.onSessionStateChange(state => setSessionState(state));
  }, []);
  const startSync = () => {
    Client.enableUnreadCount();
  };
  useEffect(() => {
    if (sessionState === 'established') {
      startSync();
      setIsConnected(true);
    }
  }, [sessionState]);
  const handleConnect = async () => {
    let loginParam;
    loginParam = {
      userId: userId,
      displayName: displayName // optional
    };
    if ((authToken === null || authToken === void 0 ? void 0 : authToken.length) > 0) {
      loginParam = {
        ...loginParam,
        authToken: authToken
      };
    }
    const response = await Client.login(loginParam, sessionHandler);
    if (response) {
      console.log('response:', response);
    }
  };
  const login = async () => {
    setError('');
    setLoading(true);
    try {
      handleConnect();
    } catch (e) {
      const errorText = (e === null || e === void 0 ? void 0 : e.message) ?? 'Error while handling request!';
      setError(errorText);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    login();
  }, [userId]);

  // TODO

  const logout = async () => {
    try {
      Client.stopUnreadSync();
      await Client.logout();
    } catch (e) {
      const errorText = (e === null || e === void 0 ? void 0 : e.message) ?? 'Error while handling request!';
      Alert.alert(errorText);
    }
  };
  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: {
      error,
      isConnecting,
      login,
      client,
      logout,
      isConnected,
      sessionState,
      apiRegion: apiRegion.toLowerCase(),
      language
    }
  }, children)
  //
  ;
};
export default AuthContextProvider;
//# sourceMappingURL=auth-provider.js.map