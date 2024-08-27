"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _authProvider = require("../providers/auth-provider");
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
  } = (0, _react.useContext)(_authProvider.AuthContext);
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
var _default = exports.default = useAuth;
//# sourceMappingURL=useAuth.js.map