"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AuthContextProvider = exports.AuthContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable react-hooks/exhaustive-deps */

const AuthContext = exports.AuthContext = /*#__PURE__*/_react.default.createContext({
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
const AuthContextProvider = ({
  userId,
  displayName,
  apiKey,
  apiRegion,
  apiEndpoint,
  children,
  authToken,
  language
}) => {
  const [error, setError] = (0, _react.useState)('');
  const [isConnecting, setLoading] = (0, _react.useState)(false);
  const [isConnected, setIsConnected] = (0, _react.useState)(false);
  const [sessionState, setSessionState] = (0, _react.useState)('');
  const client = _tsSdkReactNative.Client.createClient(apiKey, apiRegion, {
    apiEndpoint: {
      http: apiEndpoint
    }
  });
  const sessionHandler = {
    sessionWillRenewAccessToken(renewal) {
      renewal.renew();
    }
  };
  (0, _react.useEffect)(() => {
    return _tsSdkReactNative.Client.onSessionStateChange(state => setSessionState(state));
  }, []);
  const startSync = () => {
    _tsSdkReactNative.Client.enableUnreadCount();
  };
  (0, _react.useEffect)(() => {
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
    const response = await _tsSdkReactNative.Client.login(loginParam, sessionHandler);
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
  (0, _react.useEffect)(() => {
    login();
  }, [userId]);

  // TODO

  const logout = async () => {
    try {
      _tsSdkReactNative.Client.stopUnreadSync();
      await _tsSdkReactNative.Client.logout();
    } catch (e) {
      const errorText = (e === null || e === void 0 ? void 0 : e.message) ?? 'Error while handling request!';
      _reactNative.Alert.alert(errorText);
    }
  };
  return /*#__PURE__*/_react.default.createElement(AuthContext.Provider, {
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
exports.AuthContextProvider = AuthContextProvider;
var _default = exports.default = AuthContextProvider;
//# sourceMappingURL=auth-provider.js.map