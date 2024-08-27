"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EditIcon = ({
  color = "#292B32"
}) => /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none"
}, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
  d: "M10.0625 3.9375L1.375 12.625L1 16.1875C0.9375 16.6562 1.34375 17.0625 1.8125 17L5.375 16.625L14.0625 7.9375L10.0625 3.9375ZM16.5312 3.34375L14.6562 1.46875C14.0938 0.875 13.125 0.875 12.5312 1.46875L10.7812 3.21875L14.7812 7.21875L16.5312 5.46875C17.125 4.875 17.125 3.90625 16.5312 3.34375Z",
  fill: color
}));
var _default = exports.default = EditIcon;
//# sourceMappingURL=EditIcon.js.map