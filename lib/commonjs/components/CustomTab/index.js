"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CustomTab = ({
  tabName,
  onTabChange
}) => {
  const styles = (0, _styles.useStyles)();
  const [activeTab, setActiveTab] = (0, _react.useState)(1);
  const [indicatorAnim] = (0, _react.useState)(new _reactNative.Animated.Value(0));
  const [tabOneWidth, setTabOneWidth] = (0, _react.useState)(0);
  const [tabTwoWidth, setTabTwoWidth] = (0, _react.useState)(0);
  const handleTabPress = tabIndex => {
    setActiveTab(tabIndex);
    onTabChange && onTabChange(tabIndex);
    _reactNative.Animated.timing(indicatorAnim, {
      toValue: tabIndex,
      duration: 100,
      useNativeDriver: true
    }).start();
  };
  const getIndicatorPosition = () => {
    const tabWidth = tabOneWidth;
    const translateX = indicatorAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [8, 12, tabWidth + 12]
    });
    return {
      transform: [{
        translateX
      }]
    };
  };
  const getLayoutTabOneWidth = event => {
    var {
      width
    } = event.nativeEvent.layout;
    setTabOneWidth(width);
  };
  const getLayoutTabTwoWidth = event => {
    var {
      width
    } = event.nativeEvent.layout;
    setTabTwoWidth(width);
  };
  const dynamicWidthStyle = {
    width: activeTab === 1 ? tabOneWidth - 20 : tabTwoWidth - 20
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onLayout: getLayoutTabOneWidth,
    onPress: () => handleTabPress(1)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.tabText, activeTab === 1 && styles.activeTabText]
  }, tabName[0])), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onLayout: getLayoutTabTwoWidth,
    onPress: () => handleTabPress(2)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.tabText, activeTab === 2 && styles.activeTabText]
  }, tabName[1])), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.indicator, getIndicatorPosition(), dynamicWidthStyle]
  }));
};
var _default = exports.default = CustomTab;
//# sourceMappingURL=index.js.map