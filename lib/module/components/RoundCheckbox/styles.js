import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useStyles = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    roundCheckbox: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#A5A9B5',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    checked: {
      backgroundColor: theme.colors.primary,
      borderWidth: 0
    },
    checkmark: {
      fontSize: 14,
      fontWeight: '700',
      color: '#fff'
    }
  });
  return styles;
};
//# sourceMappingURL=styles.js.map