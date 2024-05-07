import { combineReducers } from "@reduxjs/toolkit";
import onlineStatusSlice from "./features/onlineStatusSlice";
import friendsSlice from "./features/friendsSlice";
import postSlice from "./features/postSlice";

const rootReducer = combineReducers({
  onlineStatus: onlineStatusSlice,
  friends_request: friendsSlice,
  posts: postSlice,
});

export default rootReducer;
