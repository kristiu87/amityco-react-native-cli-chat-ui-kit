"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = require("react-native-svg");
var _svgXmlList = require("../../svg/svg-xml-list");
var _styles = require("./styles");
var _tsSdkReactNative = require("@amityco/ts-sdk-react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EditMessageModal = ({
  visible,
  onClose,
  messageId,
  messageText,
  onFinishEdit
}) => {
  const [inputMessage, setInputMessage] = (0, _react.useState)(messageText);
  (0, _react.useEffect)(() => {
    setInputMessage(messageText);
  }, [messageText]);
  const updateMessage = async () => {
    const updatedMessage = {
      data: {
        text: inputMessage
      }
    };
    const {
      data: message
    } = await _tsSdkReactNative.MessageRepository.updateMessage(messageId, updatedMessage);
    if (message) {
      onFinishEdit && onFinishEdit();
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: visible,
    animationType: "slide"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: _styles.styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.SvgXml, {
    xml: _svgXmlList.closeIcon,
    width: "17",
    height: "17"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _styles.styles.headerText
  }, "Edit Message")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: updateMessage,
    style: _styles.styles.headerTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _styles.styles.headerText
  }, "Save"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.AllInputWrap
  }, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
    keyboardVerticalOffset: _reactNative.Platform.select({
      ios: 100,
      android: 80
    }),
    style: _styles.styles.AllInputWrap
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: _styles.styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    multiline: true,
    placeholder: "What's going on...",
    style: _styles.styles.textInput,
    value: inputMessage,
    onChangeText: text => setInputMessage(text)
  }))))));
};
var _default = exports.default = EditMessageModal;
//# sourceMappingURL=index.js.map