import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.baseShade3
    },
    tabText: {
      fontSize: 17,
      fontWeight: 'bold',
      color: theme.colors.baseShade3,
      marginHorizontal: 15,
      textAlign: 'center'
    },
    activeTabText: {
      color: theme.colors.primary
    },
    indicator: {
      position: 'absolute',
      bottom: 0,
      height: 2,
      backgroundColor: theme.colors.primary
    }
  });
  return styles;
};
//# sourceMappingURL=styles.js.map