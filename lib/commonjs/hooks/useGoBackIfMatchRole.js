"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useGoBackIfMatchRole;
var _react = require("react");
var _useIsRole = _interopRequireDefault(require("./useIsRole"));
var _useGoBackOrNavigateToStartPage = _interopRequireDefault(require("./useGoBackOrNavigateToStartPage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function useGoBackIfMatchRole(role) {
  const [isCorrectRole, isFetched] = (0, _useIsRole.default)(role);
  const goBack = (0, _useGoBackOrNavigateToStartPage.default)();
  (0, _react.useEffect)(() => {
    if (isFetched && isCorrectRole) {
      goBack();
    }
  }, [isFetched, isCorrectRole, goBack]);
}
//# sourceMappingURL=useGoBackIfMatchRole.js.map