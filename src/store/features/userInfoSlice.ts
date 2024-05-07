import { createSlice } from "@reduxjs/toolkit";

export type TuserInfo = {
  name: string;
  pfp: string;
  coverPhoto: string;
  onlineStatus: 'online' | 'away' | 'offline';
}

const initialState: TuserInfo = {
  name: "Janice Griffith",
  pfp: '/pfp.jpg',
  coverPhoto: '/cover.jpg',
  onlineStatus: 'online'
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    setStatus: (state, { payload }) => {
      return {
        ...state,
        onlineStatus: payload
      };
    },
    setPfp: (state, { payload }) => {
      return {
        ...state,
        pfp: payload
      }
    },
    setCoverPhoto: (state, { payload }) => {
      return {
        ...state,
        coverPhoto: payload
      }
    }
  },
  selectors: {
    getName: (state) => state.name,
    getPfp: (state) => state.pfp,
    getCoverPhoto: (state) => state.coverPhoto,
    getStatus: (state) => state.onlineStatus,
  }
});

export const { setStatus, setPfp, setCoverPhoto } = userInfoSlice.actions;
export const { getName, getPfp, getCoverPhoto, getStatus } = userInfoSlice.selectors
export default userInfoSlice.reducer;

