"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useGoBackIfNotRelatedToChannel;
var _react = require("react");
var _useGoBackOrNavigateToStartPage = _interopRequireDefault(require("./useGoBackOrNavigateToStartPage"));
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
var _useCurrentUser = _interopRequireDefault(require("./useCurrentUser"));
var _native = require("@react-navigation/native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function useGoBackIfNotRelatedToChannel(channelId) {
  const goBack = (0, _useGoBackOrNavigateToStartPage.default)();
  const [user, isFetched] = (0, _useCurrentUser.default)();
  const onFocus = (0, _react.useCallback)(() => {
    // @ts-ignore
    if (!isFetched || !user || channelId === '') return;
    const unsubscribe = _tsSdkReactNative.ChannelRepository.Membership.getMembers({
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
  (0, _native.useFocusEffect)(onFocus);
}
//# sourceMappingURL=useGoBackIfNotRelatedToChannel.js.map