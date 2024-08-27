import React from 'react';
import { type StyleProp, type ImageStyle } from 'react-native';
interface OverlayImageProps {
    source: string;
    progress: number;
    isShowSending?: boolean;
    containerStyle?: StyleProp<ImageStyle> | StyleProp<ImageStyle>;
}
declare const BaseLoadingImage: ({ source, isShowSending, containerStyle, progress, }: OverlayImageProps) => React.JSX.Element;
export default BaseLoadingImage;
//# sourceMappingURL=index.d.ts.map