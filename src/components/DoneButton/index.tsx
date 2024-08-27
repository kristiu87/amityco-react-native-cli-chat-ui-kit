import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  type GestureResponderEvent,
} from 'react-native';
import { useStyles } from './styles';
import translate from '../../translate/translate'
export default function DoneButton({
  onDonePressed,
}: {
  navigation: any;
  onDonePressed: { (event: GestureResponderEvent): void };
}) {

  const styles = useStyles();
  return (
    <TouchableOpacity onPress={onDonePressed}>
      <View style={styles.icon}>
        <Text style={styles.doneText}>{translate('Done')}</Text>
      </View>
    </TouchableOpacity>
  );
}
