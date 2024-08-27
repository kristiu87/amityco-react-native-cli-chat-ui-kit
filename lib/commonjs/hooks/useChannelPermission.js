"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChannelPermission = void 0;
var _react = require("react");
var _constants = require("./../constants");
var _useAuth = _interopRequireDefault(require("./../hooks/useAuth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useChannelPermission = targetId => {
  const {
    client
  } = (0, _useAuth.default)();
  const hasChannelPermission = (0, _react.useMemo)(() => {
    const channelPermission = client === null || client === void 0 ? void 0 : client.hasPermission(_constants.Permissions.AddChannelUserPermission).channel(targetId);
    channelPermission;
    return channelPermission;
  }, [client, targetId]);
  return hasChannelPermission;
};
exports.useChannelPermission = useChannelPermission;
//# sourceMappingURL=useChannelPermission.js.map