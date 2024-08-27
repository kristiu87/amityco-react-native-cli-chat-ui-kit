"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIsRole;
var _react = require("react");
var _useCurrentUser = _interopRequireDefault(require("./useCurrentUser"));
var _rolesConfigProvider = require("../providers/roles-config-provider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function useIsRole(role) {
  var _user$roles;
  const [user, isFetched] = (0, _useCurrentUser.default)();
  const roleConfig = (0, _react.useContext)(_rolesConfigProvider.RolesConfigContext);
  return [user === null || user === void 0 || (_user$roles = user.roles) === null || _user$roles === void 0 ? void 0 : _user$roles.includes(roleConfig[`${role}RoleId`]), isFetched];
}
//# sourceMappingURL=useIsRole.js.map