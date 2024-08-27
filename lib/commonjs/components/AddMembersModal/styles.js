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
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: _reactNative.Platform.OS === 'android' ? 35 : 10 // Adjust for Android status bar
    },
    header: {
      paddingTop: _reactNative.Platform.OS === 'ios' ? 50 : 20,
      // Adjust for iOS notch
      zIndex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    closeButton: {
      padding: 3
    },
    headerTextContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerText: {
      fontWeight: '600',
      fontSize: 17,
      textAlign: 'center',
      color: theme.colors.base
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginBottom: 10,
      backgroundColor: '#D9E5FC'
    },
    categoryIcon: {
      alignItems: 'center'
    },
    LoadingIndicator: {
      paddingVertical: 20
    },
    headerWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    inputWrap: {
      marginHorizontal: 16,
      backgroundColor: theme.colors.secondary,
      padding: 10,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10
    },
    input: {
      flex: 1,
      marginHorizontal: 6
    },
    cancelBtn: {
      marginRight: 16
    },
    searchScrollList: {
      paddingBottom: 110,
      marginTop: 10
    },
    doneText: {
      color: theme.colors.primary
    },
    disabledDone: {
      opacity: 0.5
    },
    sectionItem: {
      flex: 1
    }
  });
  return styles;
};
exports.useStyles = useStyles;
//# sourceMappingURL=styles.js.map