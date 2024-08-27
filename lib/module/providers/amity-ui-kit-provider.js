import * as React from 'react';
import AuthContextProvider from './auth-provider';
import { MenuProvider } from 'react-native-popup-menu';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { RolesConfigContext } from './roles-config-provider';
import { FileMessegeUploadProvider } from './file-message-upload-provider';
export default function AmityUiKitProvider({
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
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
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
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
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
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(AuthContextProvider, {
    userId: userId,
    displayName: displayName || userId,
    apiKey: apiKey,
    apiRegion: apiRegion,
    apiEndpoint: apiEndpoint,
    authToken: authToken,
    language: language
  }, /*#__PURE__*/React.createElement(RolesConfigContext.Provider, {
    value: roleConfig
  }, /*#__PURE__*/React.createElement(PaperProvider, {
    theme: darkMode ? defaultDarkTheme : customizedTheme
  }, /*#__PURE__*/React.createElement(FileMessegeUploadProvider, null, /*#__PURE__*/React.createElement(MenuProvider, null, children))))));
}
//# sourceMappingURL=amity-ui-kit-provider.js.map