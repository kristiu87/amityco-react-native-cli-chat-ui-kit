import { Platform, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'android' ? 35 : 10 // Adjust for Android status bar
    },
    header: {
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
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
    communityText: {
      marginLeft: 12,
      marginBottom: 10,
      fontSize: 15,
      fontWeight: '600'
    },
    myCommunityText: {
      color: '#292B32',
      padding: 16,
      opacity: 0.4,
      fontSize: 17
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16
    },
    rowContainerMyTimeLine: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 16,
      paddingTop: 26,
      paddingHorizontal: 16,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1
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
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      alignItems: 'center',
      paddingHorizontal: 10
    },
    input: {
      flex: 1,
      marginHorizontal: 6,
      padding: 10
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
    }
  });
  return styles;
};
//# sourceMappingURL=styles.js.map