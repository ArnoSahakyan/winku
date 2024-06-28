import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changeOnlineStatus, changeUserImage, changeUserData, loginUser } from "./userThunks";

export type TuserInfo = {
  id: number | undefined;
  fname: string | undefined;
  username: string | undefined;
  email: string | undefined;
  pfp: string | undefined;
  coverPhoto: string | undefined;
  job: string | undefined;
  onlineStatus: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  roles: string[] | undefined;
}

const initialState: { data: TuserInfo, status: string, error: string | undefined } = {
  data: {
    id: undefined,
    fname: undefined,
    username: undefined,
    email: undefined,
    pfp: undefined,
    coverPhoto: undefined,
    job: undefined,
    onlineStatus: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    roles: undefined,
  },
  status: 'idle',
  error: undefined
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.data.onlineStatus = action.payload;
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
          pfp: action.payload.pfp,
          coverPhoto: action.payload.coverPhoto
        };
        state.status = 'succeeded';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(changeUserImage.fulfilled, (state, action) => {
        if (action.payload.type === "pfp") {
          state.data.pfp = action.payload.pfp
        } else if (action.payload.type === "coverPhoto") {
          state.data.coverPhoto = action.payload.coverPhoto
        }
      })

      .addCase(changeOnlineStatus.fulfilled, (state, { payload }) => {
        state.data.onlineStatus = payload.onlineStatus
      })
      .addCase(changeOnlineStatus.rejected, (state, action) => {
        state.error = action.error.message
      })

      .addCase(changeUserData.fulfilled, (state, { payload }) => {
        state.data = {
          ...state.data,
          ...payload
        }
      })
      .addCase(changeUserData.rejected, (state, action) => {
        state.error = action.error.message
      })

  },
  selectors: {
    getUserID: (state) => state.data.id,
    getUsername: (state) => state.data.username,
    getName: (state) => state.data.fname,
    getEmail: (state) => state.data.email,
    getJob: (state) => state.data.job,
    getPfp: (state) => state.data.pfp,
    getCoverPhoto: (state) => state.data.coverPhoto,
    getStatus: (state) => state.data.onlineStatus,
    getAccessToken: (state) => state.data.accessToken,
    getRefreshToken: (state) => state.data.refreshToken
  }
});

export const { setStatus, setAccessToken, userLogout } = userInfoSlice.actions;
export const { getUserID, getUsername, getName, getEmail, getPfp, getJob, getCoverPhoto, getStatus, getAccessToken, getRefreshToken } = userInfoSlice.selectors;

export default userInfoSlice.reducer;
