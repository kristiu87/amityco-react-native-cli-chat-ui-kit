"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
const useStyles = () => {
  const theme = (0, _reactNativePaper.useTheme)();
  const styles = _reactNative.StyleSheet.create({
    fontStyle: {
      color: '#1054DE',
      fontWeight: '500',
      margin: 5,
      fontSize: 17
    },
    tabStyle: {
      backgroundColor: '#FFFFF',
      minHeight: 30,
      width: 100,
      padding: 6
    },
    indicatorStyle: {
      backgroundColor: '#1054DE'
    },
    topBar: {
      // paddingTop: Platform.OS === 'ios' ? 50 : 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      paddingVertical: 20
    },
    addChatIcon: {
      width: 24,
      height: 20,
      resizeMode: 'contain'
    },
    titleText: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.base
    },
    tabView: {
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: 'row'
    },
    tabViewTitle: {
      // paddingHorizontal:20,
      paddingBottom: 14,
      fontWeight: '600',
      fontSize: 17,
      color: theme.colors.primary,
      borderBottomColor: '#1054DE',
      alignSelf: 'flex-start'
    },
    indicator: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
      marginHorizontal: 20
    },
    androidWrap: {
      marginTop: 0
    },
    iosWrap: {
      marginTop: 30
    },
    chatContainer: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    chatListContainer: {
      paddingBottom: _reactNative.Platform.OS === 'ios' ? 65 : 35
    },
    NoConversationContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    NoConversationText: {
      color: theme.colors.base
    }
  });
  return styles;
};
exports.useStyles = useStyles;
//# sourceMappingURL=styles.js.map