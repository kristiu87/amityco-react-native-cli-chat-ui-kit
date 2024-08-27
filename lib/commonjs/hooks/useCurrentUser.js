"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _useAuth = _interopRequireDefault(require("./useAuth"));
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @example
 * ```ts
 * const [user, isFetched] = useCurrentUser()
 *
 * user.roles // ["b78323a5-ec93-4ad6-87b8-1a87760f8346"]
 * ```
 */
function useCurrentUser() {
  const {
    client
  } = (0, _useAuth.default)();
  const [user, setUser] = (0, _react.useState)(null);
  const [isFetched, setIsFetched] = (0, _react.useState)(false);

  // @ts-ignore
  (0, _react.useEffect)(() => {
    const userId = client === null || client === void 0 ? void 0 : client.userId;
    if (userId) {
      const unsubscribe = _tsSdkReactNative.UserRepository.getUser(userId, ({
        loading,
        data
      }) => {
        if (!loading) {
          setUser(data);
          setIsFetched(true);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [client]);
  return [user, isFetched];
}
var _default = exports.default = useCurrentUser;
//# sourceMappingURL=useCurrentUser.js.map