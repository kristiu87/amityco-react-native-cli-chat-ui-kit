import { configureStore } from '@reduxjs/toolkit';
import RecentChatSlice from '../slices/RecentChatSlice';
export const store = configureStore({
  reducer: {
    recentChat: RecentChatSlice.reducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//# sourceMappingURL=index.js.map