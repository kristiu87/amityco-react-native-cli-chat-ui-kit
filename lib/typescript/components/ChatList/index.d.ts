import * as React from 'react';
import type { UserInterface } from '../../types/user.interface';
export interface IChatListProps {
    chatId: string;
    chatName: string;
    chatMemberNumber: number;
    unReadMessage: number;
    messageDate: string;
    channelType: 'conversation' | 'broadcast' | 'live' | 'community' | '';
    avatarFileId: string | undefined;
}
export interface IGroupChatObject {
    displayName: string;
    memberCount: number;
    users?: UserInterface[];
    avatarFileId: string | undefined;
}
declare const ChatList: React.FC<IChatListProps>;
export default ChatList;
//# sourceMappingURL=index.d.ts.map