import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TonlineStatus = 'online' | 'away' | 'offline';

const onlineStatusSlice = createSlice({
  name: 'onlineStatus',
  initialState: 'online' as TonlineStatus,
  reducers: {
    setStatus: (_, action: PayloadAction<TonlineStatus>) => {
      return action.payload;
    }
  },
  selectors: {
    getStatus: (state) => state
  }
});

export const { setStatus } = onlineStatusSlice.actions;
export const { getStatus } = onlineStatusSlice.selectors
export default onlineStatusSlice.reducer;

