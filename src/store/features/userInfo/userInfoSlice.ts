import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changeCover, changePfp, loginUser } from "./userThunks";

export type TuserInfo = {
  id: number | null;
  fname: string | null;
  username: string | null;
  email: string | null;
  pfp: string | null;
  coverPhoto: string | null;
  job: string | null;
  onlineStatus: 'online' | 'away' | 'offline' | null;
  accessToken: string | null;
  refreshToken: string | null;
  roles: string[] | null;
}

const initialState: { data: TuserInfo, status: string, error: string | undefined } = {
  data: {
    id: null,
    fname: null,
    username: null,
    email: null,
    pfp: null,
    coverPhoto: null,
    job: null,
    onlineStatus: null,
    accessToken: null,
    refreshToken: null,
    roles: null,
  },
  status: 'idle',
  error: undefined
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<'online' | 'away' | 'offline'>) => {
      state.data.onlineStatus = action.payload;
    },
    setPfp: (state, action: PayloadAction<string>) => {
      state.data.pfp = action.payload;
    },
    setCoverPhoto: (state, action: PayloadAction<string>) => {
      state.data.coverPhoto = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.data.accessToken = action.payload
    },
    userLogout: (state) => {
      state.data = initialState.data;
      state.status = 'idle';
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = {
          ...action.payload,
          pfp: `${import.meta.env.VITE_PICTURE_PATH}${action.payload.pfp}`,
          coverPhoto: `${import.meta.env.VITE_PICTURE_PATH}${action.payload.coverPhoto}`
        };
        state.status = 'succeeded';
        console.log('State:', state.data);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Login Failed:', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(changePfp.fulfilled, (state, action) => {
        state.data.pfp = `${import.meta.env.VITE_PICTURE_PATH}${action.payload.relativePath}`
      })
      .addCase(changeCover.fulfilled, (state, action) => {
        state.data.coverPhoto = `${import.meta.env.VITE_PICTURE_PATH}${action.payload.relativePath}`
      })

  },
  selectors: {
    getUserID: (state) => state.data.id,
    getUsername: (state) => state.data.username,
    getName: (state) => state.data.fname,
    getPfp: (state) => state.data.pfp,
    getCoverPhoto: (state) => state.data.coverPhoto,
    getStatus: (state) => state.data.onlineStatus,
    getAccessToken: (state) => state.data.accessToken,
    getRefreshToken: (state) => state.data.refreshToken
  }
});

export const { setStatus, setPfp, setCoverPhoto, setAccessToken, userLogout } = userInfoSlice.actions;
export const { getUserID, getUsername, getName, getPfp, getCoverPhoto, getStatus, getAccessToken, getRefreshToken } = userInfoSlice.selectors;

export default userInfoSlice.reducer;
