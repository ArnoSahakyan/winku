import { combineReducers } from "@reduxjs/toolkit";
import friendsSlice from "./features/friends/friendsSlice";
import postSlice from "./features/post/postSlice";
import userInfoSlice from "./features/userInfo/userInfoSlice";
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";

export const userInfoPersistConfig = {
  key: 'userInfo',
  storage,
  blacklist: ['error']
};

export const rootReducer = combineReducers({
  friends_request: friendsSlice,
  posts: postSlice,
  userInfo: persistReducer(userInfoPersistConfig, userInfoSlice),
});

export default rootReducer;
