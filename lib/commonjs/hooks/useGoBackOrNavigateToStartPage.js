"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useGoBackNavigateToStartPage;
var _native = require("@react-navigation/native");
var _react = require("react");
function useGoBackNavigateToStartPage() {
  const navigation = (0, _native.useNavigation)();
  return (0, _react.useCallback)(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(_native.StackActions.replace('RecentChat'));
    }
  }, [navigation]);
}
//# sourceMappingURL=useGoBackOrNavigateToStartPage.js.map