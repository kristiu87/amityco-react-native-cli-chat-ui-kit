import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { uploadImageFile } from './file-provider';
import { MessageRepository } from '@amityco/ts-sdk-react-native';
export const FileMessegeUploadContext = /*#__PURE__*/createContext(null);
export const FileMessegeUploadProvider = ({
  children
}) => {
  const [uploadList, setUploadList] = useState([]);
  const removingQueue = useRef([]);
  const upload = useCallback(async fileMessage => {
    setUploadList(prev => [...prev, {
      ...fileMessage,
      percent: 0
    }]);
    const [uploadedFile] = await uploadImageFile(fileMessage.fileUri, percent => setUploadList(prev => {
      const updateList = [...prev];
      const index = updateList.findIndex(item => item.fileUri === fileMessage.fileUri);
      updateList[index].percent = percent;
      return updateList;
    }));
    if (uploadedFile) {
      await MessageRepository.createMessage({
        subChannelId: fileMessage.channelId,
        dataType: fileMessage.type,
        fileId: uploadedFile.fileId
      });
    }
    removingQueue.current.push(fileMessage.fileUri);
  }, [setUploadList]);
  useEffect(() => {
    const removeLoop = setInterval(() => {
      var _removingQueue$curren;
      if (((_removingQueue$curren = removingQueue.current) === null || _removingQueue$curren === void 0 ? void 0 : _removingQueue$curren.length) > 0) {
        const latestQueue = [...removingQueue.current];
        setUploadList(prev => prev.filter(item => !latestQueue.includes(item.fileUri)));
        removingQueue.current.splice(0, latestQueue.length);
      }
    }, 1000);
    return () => clearInterval(removeLoop);
  }, []);
  return /*#__PURE__*/React.createElement(FileMessegeUploadContext.Provider, {
    value: {
      uploadList,
      upload
    }
  }, children);
};
//# sourceMappingURL=file-message-upload-provider.js.map