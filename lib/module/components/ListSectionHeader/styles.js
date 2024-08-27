import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    sectionHeader: {
      backgroundColor: theme.colors.secondary,
      paddingVertical: 10,
      paddingHorizontal: 10
    },
    sectionHeaderText: {
      fontWeight: '600',
      fontSize: 15,
      color: theme.colors.baseShade2
    }
  });
  return styles;
};
//# sourceMappingURL=styles.js.map