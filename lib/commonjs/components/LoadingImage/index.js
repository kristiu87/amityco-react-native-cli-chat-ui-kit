"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _fileProvider = require("../../providers/file-provider");
var _BaseLoadingImage = _interopRequireDefault(require("../BaseLoadingImage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const LoadingImage = ({
  source,
  onLoadFinish,
  isShowSending = true,
  containerStyle
}) => {
  const [progress, setProgress] = (0, _react.useState)(0);
  const uploadFileToAmity = (0, _react.useCallback)(async () => {
    const file = await (0, _fileProvider.uploadImageFile)(source, percent => {
      setProgress(percent);
    }, true);
    if (file) {
      var _file$;
      setProgress(100);
      onLoadFinish && onLoadFinish((_file$ = file[0]) === null || _file$ === void 0 ? void 0 : _file$.fileId, source);
    }
  }, [source, onLoadFinish]);
  (0, _react.useEffect)(() => {
    if (progress === 0) {
      uploadFileToAmity();
    }
  }, [progress, uploadFileToAmity]);
  return /*#__PURE__*/_react.default.createElement(_BaseLoadingImage.default, {
    source: source,
    isShowSending: isShowSending,
    progress: progress,
    containerStyle: containerStyle
  });
};
var _default = exports.default = LoadingImage;
//# sourceMappingURL=index.js.map