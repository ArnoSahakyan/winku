import { combineReducers } from "@reduxjs/toolkit";
import friendsSlice from "./features/friendsSlice";
import postSlice from "./features/postSlice";
import userInfoSlice from "./features/userInfoSlice";

const rootReducer = combineReducers({
  friends_request: friendsSlice,
  posts: postSlice,
  userInfo: userInfoSlice
});

export default rootReducer;
