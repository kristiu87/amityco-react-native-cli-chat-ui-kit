import React, { useMemo } from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  type StyleProp,
  type ImageStyle,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { createStyles } from './styles';
import translate from '../../translate/translate'

interface OverlayImageProps {
  source: string;
  progress: number;
  isShowSending?: boolean;
  containerStyle?: StyleProp<ImageStyle> | StyleProp<ImageStyle>;
}
const BaseLoadingImage = ({
  source,
  isShowSending = true,
  containerStyle,
  progress,
}: OverlayImageProps) => {
  const isProcess = useMemo(() => progress === 100, [progress]);
  const loading = useMemo(() => !isProcess, [isProcess]);
  const styles = createStyles();

  return (
    <View key={source} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: source }}
          style={[
            containerStyle ? containerStyle : styles.image,
            loading ? styles.loadingImage : styles.loadedImage,
          ]}
        />
        {loading && (
          <View style={styles.overlay}>
            {isProcess ? (
              <Progress.CircleSnail size={60} borderColor="transparent" />
            ) : (
              <Progress.Circle
                progress={50 / 100}
                size={60}
                borderColor="transparent"
                unfilledColor="#ffffff"
              />
            )}
          </View>
        )}
      </View>
      {isShowSending && loading && (
        <View style={styles.loadingRow}>
          <Text style={styles.loadingText}>{translate('sending')}</Text>
          <ActivityIndicator size={20} color={'gray'} />
        </View>
      )}
    </View>
  );
};
export default BaseLoadingImage;
