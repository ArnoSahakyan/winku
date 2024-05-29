import { combineReducers } from "@reduxjs/toolkit";
import friendsSlice from "./features/friendsSlice";
import postSlice from "./features/postSlice";
import userInfoSlice from "./features/userInfo/userInfoSlice";
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";

export const userInfoPersistConfig = {
  key: 'userInfo',
  storage,
};

export const rootReducer = combineReducers({
  friends_request: friendsSlice,
  posts: postSlice,
  userInfo: persistReducer(userInfoPersistConfig, userInfoSlice),
});

export default rootReducer;
