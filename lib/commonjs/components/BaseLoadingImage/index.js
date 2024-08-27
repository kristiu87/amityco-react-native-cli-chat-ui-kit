"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var Progress = _interopRequireWildcard(require("react-native-progress"));
var _styles = require("./styles");
var _translate = _interopRequireDefault(require("../../translate/translate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const BaseLoadingImage = ({
  source,
  isShowSending = true,
  containerStyle,
  progress
}) => {
  const isProcess = (0, _react.useMemo)(() => progress === 100, [progress]);
  const loading = (0, _react.useMemo)(() => !isProcess, [isProcess]);
  const styles = (0, _styles.createStyles)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: source,
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.imageContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: {
      uri: source
    },
    style: [containerStyle ? containerStyle : styles.image, loading ? styles.loadingImage : styles.loadedImage]
  }), loading && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.overlay
  }, isProcess ? /*#__PURE__*/_react.default.createElement(Progress.CircleSnail, {
    size: 60,
    borderColor: "transparent"
  }) : /*#__PURE__*/_react.default.createElement(Progress.Circle, {
    progress: 50 / 100,
    size: 60,
    borderColor: "transparent",
    unfilledColor: "#ffffff"
  }))), isShowSending && loading && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.loadingRow
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.loadingText
  }, (0, _translate.default)('sending')), /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: 20,
    color: 'gray'
  })));
};
var _default = exports.default = BaseLoadingImage;
//# sourceMappingURL=index.js.map