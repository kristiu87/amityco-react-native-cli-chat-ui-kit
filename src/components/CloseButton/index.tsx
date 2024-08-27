import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './styles';
import translate from '../../translate/translate'
export default function CloseButton({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.icon}>
        <Text style={styles.cancelText}>{translate('Cancel')}</Text>
      </View>
    </TouchableOpacity>
  );
}
