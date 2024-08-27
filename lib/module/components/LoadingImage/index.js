import React, { useCallback, useEffect, useState } from 'react';
import { uploadImageFile } from '../../providers/file-provider';
import BaseLoadingImage from '../BaseLoadingImage';
const LoadingImage = ({
  source,
  onLoadFinish,
  isShowSending = true,
  containerStyle
}) => {
  const [progress, setProgress] = useState(0);
  const uploadFileToAmity = useCallback(async () => {
    const file = await uploadImageFile(source, percent => {
      setProgress(percent);
    }, true);
    if (file) {
      var _file$;
      setProgress(100);
      onLoadFinish && onLoadFinish((_file$ = file[0]) === null || _file$ === void 0 ? void 0 : _file$.fileId, source);
    }
  }, [source, onLoadFinish]);
  useEffect(() => {
    if (progress === 0) {
      uploadFileToAmity();
    }
  }, [progress, uploadFileToAmity]);
  return /*#__PURE__*/React.createElement(BaseLoadingImage, {
    source: source,
    isShowSending: isShowSending,
    progress: progress,
    containerStyle: containerStyle
  });
};
export default LoadingImage;
//# sourceMappingURL=index.js.map