import { PayloadAction } from '@reduxjs/toolkit';
import { IChatListProps } from '../../components/ChatList';
interface RecentChatState {
    channelList: IChatListProps[];
}
declare const recentChatSlice: import("@reduxjs/toolkit").Slice<RecentChatState, {
    updateRecentChat: (state: import("immer").WritableDraft<RecentChatState>, action: PayloadAction<IChatListProps[]>) => void;
    updateByChannelId: (state: import("immer").WritableDraft<RecentChatState>, action: PayloadAction<{
        channelId: string;
        updatedChannelData: IChatListProps;
    }>) => void;
    deleteByChannelId: (state: import("immer").WritableDraft<RecentChatState>, action: PayloadAction<{
        channelId: string;
    }>) => void;
    clearChannelList: (state: import("immer").WritableDraft<RecentChatState>) => void;
}, "recentChat", "recentChat", import("@reduxjs/toolkit").SliceSelectors<RecentChatState>>;
export default recentChatSlice;
//# sourceMappingURL=RecentChatSlice.d.ts.map