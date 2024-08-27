import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  channelList: []
};
const recentChatSlice = createSlice({
  name: 'recentChat',
  initialState,
  reducers: {
    updateRecentChat: (state, action) => {
      const getUniqueArrayById = arr => {
        const uniqueIds = new Set(state.channelList.map(channel => channel.chatId));
        return arr.filter(channel => !uniqueIds.has(channel.chatId));
      };
      state.channelList = [...state.channelList, ...getUniqueArrayById(action.payload)];
    },
    updateByChannelId: (state, action) => {
      const {
        channelId,
        updatedChannelData
      } = action.payload;
      const index = state.channelList.findIndex(item => item.chatId === channelId);
      state.channelList[index] = updatedChannelData;
    },
    deleteByChannelId: (state, action) => {
      const {
        channelId
      } = action.payload;
      const prevChannelList = [...state.channelList];
      const updatedChannelList = prevChannelList.filter(item => item.chatId !== channelId);
      state.channelList = updatedChannelList;
    },
    clearChannelList: state => {
      state.channelList = [];
    }
  }
});
export default recentChatSlice;
//# sourceMappingURL=RecentChatSlice.js.map