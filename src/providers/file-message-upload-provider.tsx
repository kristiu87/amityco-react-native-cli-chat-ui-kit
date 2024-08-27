import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { uploadImageFile } from './file-provider';
import {
  MessageContentType,
  MessageRepository,
} from '@amityco/ts-sdk-react-native';

export interface FileMessegeUploadItem {
  channelId: string;
  fileUri: string;
  type: (typeof MessageContentType)[keyof typeof MessageContentType];
  percent: number;
}

export interface FileMessegeUploadContextValue {
  uploadList: FileMessegeUploadItem[];
  upload: (fileMessage: Omit<FileMessegeUploadItem, 'percent'>) => void;
}

export const FileMessegeUploadContext =
  createContext<FileMessegeUploadContextValue>(null);

export interface FileMessegeUploadProviderProps {
  children: ReactNode;
}

export const FileMessegeUploadProvider = ({
  children,
}: FileMessegeUploadProviderProps) => {
  const [uploadList, setUploadList] = useState<FileMessegeUploadItem[]>([]);
  const removingQueue = useRef<string[]>([]);

  const upload = useCallback(
    async (fileMessage: Omit<FileMessegeUploadItem, 'percent'>) => {
      setUploadList((prev) => [...prev, { ...fileMessage, percent: 0 }]);

      const [uploadedFile] = await uploadImageFile(
        fileMessage.fileUri,
        (percent) =>
          setUploadList((prev) => {
            const updateList = [...prev];
            const index = updateList.findIndex(
              (item) => item.fileUri === fileMessage.fileUri
            );

            updateList[index].percent = percent;

            return updateList;
          })
      );

      if (uploadedFile) {
        await MessageRepository.createMessage({
          subChannelId: fileMessage.channelId,
          dataType: fileMessage.type,
          fileId: uploadedFile.fileId,
        });
      }

      removingQueue.current.push(fileMessage.fileUri);
    },
    [setUploadList]
  );

  useEffect(() => {
    const removeLoop = setInterval(() => {
      if (removingQueue.current?.length > 0) {
        const latestQueue = [...removingQueue.current];

        setUploadList((prev) =>
          prev.filter((item) => !latestQueue.includes(item.fileUri))
        );

        removingQueue.current.splice(0, latestQueue.length);
      }
    }, 1000);

    return () => clearInterval(removeLoop);
  }, []);

  return (
    <FileMessegeUploadContext.Provider
      value={{
        uploadList,
        upload,
      }}
    >
      {children}
    </FileMessegeUploadContext.Provider>
  );
};
