"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchBar;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SearchBar({
  handleSearch
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: _styles.styles.searchBar
    // value={searchText}
    ,
    placeholder: "Search",
    onChangeText: handleSearch
  });
}
;
//# sourceMappingURL=index.js.map