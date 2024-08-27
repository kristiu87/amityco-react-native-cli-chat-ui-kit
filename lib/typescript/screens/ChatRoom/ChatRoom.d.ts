import React from 'react';
import { type RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../routes/RouteParamList';
import type { StackNavigationProp } from '@react-navigation/stack';
type ChatRoomScreenComponentType = React.FC<{
    route: RouteProp<RootStackParamList, 'ChatRoom'>;
    navigation: StackNavigationProp<RootStackParamList, 'ChatRoom'>;
}>;
export interface IDisplayImage {
    url: string;
    fileId: string | undefined;
    fileName: string;
    isUploaded: boolean;
    thumbNail?: string;
}
declare const ChatRoom: ChatRoomScreenComponentType;
export default ChatRoom;
//# sourceMappingURL=ChatRoom.d.ts.map