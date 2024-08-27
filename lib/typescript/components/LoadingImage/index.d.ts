import React from 'react';
import { type StyleProp, type ImageStyle } from 'react-native';
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
declare const LoadingImage: ({ source, onLoadFinish, isShowSending, containerStyle, }: OverlayImageProps) => React.JSX.Element;
export default LoadingImage;
//# sourceMappingURL=index.d.ts.map