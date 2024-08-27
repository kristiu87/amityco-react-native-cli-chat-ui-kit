"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _RecentChatSlice = _interopRequireDefault(require("../slices/RecentChatSlice"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const store = exports.store = (0, _toolkit.configureStore)({
  reducer: {
    recentChat: _RecentChatSlice.default.reducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//# sourceMappingURL=index.js.map