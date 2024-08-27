import React, { ReactNode } from 'react';
import { MessageContentType } from '@amityco/ts-sdk-react-native';
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
export declare const FileMessegeUploadContext: React.Context<FileMessegeUploadContextValue>;
export interface FileMessegeUploadProviderProps {
    children: ReactNode;
}
export declare const FileMessegeUploadProvider: ({ children, }: FileMessegeUploadProviderProps) => React.JSX.Element;
//# sourceMappingURL=file-message-upload-provider.d.ts.map