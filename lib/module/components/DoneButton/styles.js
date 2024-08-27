import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    icon: {
      backgroundColor: theme.colors.background,
      color: '#000',
      height: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    doneText: {
      fontSize: 18,
      color: theme.colors.primary
    }
  });
  return styles;
};
//# sourceMappingURL=styles.js.map