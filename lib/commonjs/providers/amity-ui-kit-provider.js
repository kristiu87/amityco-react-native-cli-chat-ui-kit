"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AmityUiKitProvider;
var React = _interopRequireWildcard(require("react"));
var _authProvider = _interopRequireDefault(require("./auth-provider"));
var _reactNativePopupMenu = require("react-native-popup-menu");
var _reactNativePaper = require("react-native-paper");
var _store = require("../redux/store");
var _reactRedux = require("react-redux");
var _rolesConfigProvider = require("./roles-config-provider");
var _fileMessageUploadProvider = require("./file-message-upload-provider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function AmityUiKitProvider({
  userId,
  displayName,
  apiKey,
  apiRegion,
  language,
  apiEndpoint,
  children,
  theme,
  authToken,
  roleConfig,
  darkMode = false
}) {
  var _theme$chatBubbles, _theme$chatBubbles2, _theme$chatMessageTex, _theme$chatMessageTex2, _theme$chatBubbles3, _theme$chatBubbles4, _theme$chatMessageTex3, _theme$chatMessageTex4;
  const customizedTheme = {
    ..._reactNativePaper.DefaultTheme,
    colors: {
      ..._reactNativePaper.DefaultTheme.colors,
      primary: (theme === null || theme === void 0 ? void 0 : theme.primary) ?? '#1054DE',
      secondary: (theme === null || theme === void 0 ? void 0 : theme.secondary) ?? '#EBECEF',
      background: (theme === null || theme === void 0 ? void 0 : theme.background) ?? '#FFFFFF',
      border: (theme === null || theme === void 0 ? void 0 : theme.border) ?? '#EBECEF',
      base: (theme === null || theme === void 0 ? void 0 : theme.base) ?? '#292B32',
      baseShade1: (theme === null || theme === void 0 ? void 0 : theme.baseShade1) ?? '#636878',
      baseShade2: (theme === null || theme === void 0 ? void 0 : theme.baseShade2) ?? '#898E9E',
      baseShade3: (theme === null || theme === void 0 ? void 0 : theme.baseShade3) ?? '#A5A9B5',
      screenBackground: (theme === null || theme === void 0 ? void 0 : theme.screenBackground) ?? '#F9F9FA',
      chatBubbles: {
        userBubble: (theme === null || theme === void 0 || (_theme$chatBubbles = theme.chatBubbles) === null || _theme$chatBubbles === void 0 ? void 0 : _theme$chatBubbles.userBubble) ?? '#1054DE',
        friendBubble: (theme === null || theme === void 0 || (_theme$chatBubbles2 = theme.chatBubbles) === null || _theme$chatBubbles2 === void 0 ? void 0 : _theme$chatBubbles2.friendBubble) ?? '#EBECEF'
      },
      chatMessageTexts: {
        userMessageText: (theme === null || theme === void 0 || (_theme$chatMessageTex = theme.chatMessageTexts) === null || _theme$chatMessageTex === void 0 ? void 0 : _theme$chatMessageTex.userMessageText) ?? '#FFFFFF',
        friendMessageText: (theme === null || theme === void 0 || (_theme$chatMessageTex2 = theme.chatMessageTexts) === null || _theme$chatMessageTex2 === void 0 ? void 0 : _theme$chatMessageTex2.friendMessageText) ?? '#292B32'
      },
      chatTopBar: (theme === null || theme === void 0 ? void 0 : theme.chatTopBar) ?? '#FFFFFF'
    }
  };
  globalThis.Language = language;
  const defaultDarkTheme = {
    ..._reactNativePaper.DefaultTheme,
    colors: {
      ..._reactNativePaper.DefaultTheme.colors,
      primary: (theme === null || theme === void 0 ? void 0 : theme.primary) ?? '#1054DE',
      // Primary color for main elements
      secondary: (theme === null || theme === void 0 ? void 0 : theme.secondary) ?? '#292B32',
      // Secondary color UI elements e.g comment bubble, input bar
      background: (theme === null || theme === void 0 ? void 0 : theme.background) ?? '#191919',
      // Background color for the overall theme
      border: (theme === null || theme === void 0 ? void 0 : theme.border) ?? '#292B32',
      // Border color for elements
      base: (theme === null || theme === void 0 ? void 0 : theme.base) ?? '#FFFFFF',
      // Base color for main text, Title, input text
      baseShade1: (theme === null || theme === void 0 ? void 0 : theme.baseShade1) ?? '#EBECEF',
      // Base color for Sub Text, Sub Title, TimeStamp Text
      baseShade2: (theme === null || theme === void 0 ? void 0 : theme.baseShade2) ?? '#EBECEF',
      // Base color for comments, like text
      baseShade3: (theme === null || theme === void 0 ? void 0 : theme.baseShade3) ?? '#EBECEF',
      // Base color for placeHolder
      screenBackground: (theme === null || theme === void 0 ? void 0 : theme.screenBackground) ?? '#000000',
      chatBubbles: {
        userBubble: (theme === null || theme === void 0 || (_theme$chatBubbles3 = theme.chatBubbles) === null || _theme$chatBubbles3 === void 0 ? void 0 : _theme$chatBubbles3.userBubble) ?? '#1054DE',
        friendBubble: (theme === null || theme === void 0 || (_theme$chatBubbles4 = theme.chatBubbles) === null || _theme$chatBubbles4 === void 0 ? void 0 : _theme$chatBubbles4.friendBubble) ?? '#32343A'
      },
      chatMessageTexts: {
        userMessageText: (theme === null || theme === void 0 || (_theme$chatMessageTex3 = theme.chatMessageTexts) === null || _theme$chatMessageTex3 === void 0 ? void 0 : _theme$chatMessageTex3.userMessageText) ?? '#FFFFFF',
        friendMessageText: (theme === null || theme === void 0 || (_theme$chatMessageTex4 = theme.chatMessageTexts) === null || _theme$chatMessageTex4 === void 0 ? void 0 : _theme$chatMessageTex4.friendMessageText) ?? '#292B32'
      },
      chatTopBar: (theme === null || theme === void 0 ? void 0 : theme.chatTopBar) ?? '#292B32'
    }
  };
  return /*#__PURE__*/React.createElement(_reactRedux.Provider, {
    store: _store.store
  }, /*#__PURE__*/React.createElement(_authProvider.default, {
    userId: userId,
    displayName: displayName || userId,
    apiKey: apiKey,
    apiRegion: apiRegion,
    apiEndpoint: apiEndpoint,
    authToken: authToken,
    language: language
  }, /*#__PURE__*/React.createElement(_rolesConfigProvider.RolesConfigContext.Provider, {
    value: roleConfig
  }, /*#__PURE__*/React.createElement(_reactNativePaper.PaperProvider, {
    theme: darkMode ? defaultDarkTheme : customizedTheme
  }, /*#__PURE__*/React.createElement(_fileMessageUploadProvider.FileMessegeUploadProvider, null, /*#__PURE__*/React.createElement(_reactNativePopupMenu.MenuProvider, null, children))))));
}
//# sourceMappingURL=amity-ui-kit-provider.js.map