import React, { useCallback, useEffect, useState } from 'react';
import { type StyleProp, type ImageStyle } from 'react-native';
import { uploadImageFile } from '../../providers/file-provider';
import BaseLoadingImage from '../BaseLoadingImage';

interface OverlayImageProps {
  source: string;
  onClose?: (originalPath: string) => void;
  onLoadFinish?: (fileId: string, originalPath: string) => void;
  index?: number;
  isUploaded?: boolean;
  fileId?: string;
  isShowSending?: boolean;
  containerStyle?: StyleProp<ImageStyle> | StyleProp<ImageStyle>;
}
const LoadingImage = ({
  source,
  onLoadFinish,
  isShowSending = true,
  containerStyle,
}: OverlayImageProps) => {
  const [progress, setProgress] = useState(0);

  const uploadFileToAmity = useCallback(async () => {
    const file: Amity.File<any>[] = await uploadImageFile(
      source,
      (percent: number) => {
        setProgress(percent);
      },
      true
    );
    if (file) {
      setProgress(100);
      onLoadFinish && onLoadFinish(file[0]?.fileId as string, source);
    }
  }, [source, onLoadFinish]);

  useEffect(() => {
    if (progress === 0) {
      uploadFileToAmity();
    }
  }, [progress, uploadFileToAmity]);

  return (
    <BaseLoadingImage
      source={source}
      isShowSending={isShowSending}
      progress={progress}
      containerStyle={containerStyle}
    />
  );
};
export default LoadingImage;
