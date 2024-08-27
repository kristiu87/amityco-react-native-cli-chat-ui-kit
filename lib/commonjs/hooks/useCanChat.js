"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCanChat;
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _react = require("react");
var _rolesConfigProvider = require("../providers/roles-config-provider");
function useCanChat(channelId) {
  const [canChat, setCanChat] = (0, _react.useState)(false);
  const roleConfig = (0, _react.useContext)(_rolesConfigProvider.RolesConfigContext);
  (0, _react.useEffect)(() => {
    const unsubscribe = _tsSdkReactNative.ChannelRepository.Membership.getMembers({
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
      } = await _tsSdkReactNative.UserRepository.getUserByIds(data.map(member => member.userId));
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