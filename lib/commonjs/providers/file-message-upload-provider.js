"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileMessegeUploadProvider = exports.FileMessegeUploadContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _fileProvider = require("./file-provider");
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const FileMessegeUploadContext = exports.FileMessegeUploadContext = /*#__PURE__*/(0, _react.createContext)(null);
const FileMessegeUploadProvider = ({
  children
}) => {
  const [uploadList, setUploadList] = (0, _react.useState)([]);
  const removingQueue = (0, _react.useRef)([]);
  const upload = (0, _react.useCallback)(async fileMessage => {
    setUploadList(prev => [...prev, {
      ...fileMessage,
      percent: 0
    }]);
    const [uploadedFile] = await (0, _fileProvider.uploadImageFile)(fileMessage.fileUri, percent => setUploadList(prev => {
      const updateList = [...prev];
      const index = updateList.findIndex(item => item.fileUri === fileMessage.fileUri);
      updateList[index].percent = percent;
      return updateList;
    }));
    if (uploadedFile) {
      await _tsSdkReactNative.MessageRepository.createMessage({
        subChannelId: fileMessage.channelId,
        dataType: fileMessage.type,
        fileId: uploadedFile.fileId
      });
    }
    removingQueue.current.push(fileMessage.fileUri);
  }, [setUploadList]);
  (0, _react.useEffect)(() => {
    const removeLoop = setInterval(() => {
      var _removingQueue$curren;
      if (((_removingQueue$curren = removingQueue.current) === null || _removingQueue$curren === void 0 ? void 0 : _removingQueue$curren.length) > 0) {
        const latestQueue = [...removingQueue.current];
        setUploadList(prev => prev.filter(item => !latestQueue.includes(item.fileUri)));
        removingQueue.current.splice(0, latestQueue.length);
      }
    }, 1000);
    return () => clearInterval(removeLoop);
  }, []);
  return /*#__PURE__*/_react.default.createElement(FileMessegeUploadContext.Provider, {
    value: {
      uploadList,
      upload
    }
  }, children);
};
exports.FileMessegeUploadProvider = FileMessegeUploadProvider;
//# sourceMappingURL=file-message-upload-provider.js.map