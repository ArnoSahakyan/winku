import { createSlice } from "@reduxjs/toolkit";
import { deleteFriend, getFriendsApi, getMessages, getRequestsApi, getUnassociatedApi, respondRequest } from "./friendThunks";

export type TFriend = {
  friendshipId: number;
  id: number;
  fname: string;
  email: string;
  onlineStatus: string;
  job: string;
  pfp: string;
}

export type TRequest = {
  requestId: number,
  senderId: number,
  status: string,
  fname: string,
  pfp: string
}

export type TFriendBack = {
  friendshipId: number;
  id: number;
  fname: string;
  username: string;
  pfp: string;
  job: string;
  email: string;
  onlineStatus: string;
  messages: TMessages[];
}

export type Tunassocitaed = {
  id: number,
  fname: string,
  username: string
  job: string,
  pfp: string,
}

type TUsers = {
  requests: TRequest[],
  friendsBack: TFriendBack[],
  unassociated: Tunassocitaed[]
}

export type TMessages = {
  messageId: number;
  senderId: number;
  receiverId: number;
  message: string;
}

const initialState: TUsers = {
  requests: [],
  friendsBack: [],
  unassociated: []
};

const friendsSlice = createSlice({
  name: 'friends_request',
  initialState: initialState,
  reducers: {
    receiveMessage: (state, { payload }) => {
      // const { friendId, message } = payload;
      const friend = state.friendsBack.find(friend => friend.id === payload.senderId);

      if (friend) {
        const newMessage = {
          messageId: new Date().getUTCMilliseconds(),
          ...payload
        };
        friend.messages.push(newMessage);
      }
    },
    sendMessage: (state, { payload }) => {
      // const { friendId, message } = payload;
      const friend = state.friendsBack.find(friend => friend.id === payload.receiverId);
      if (friend) {
        const newMessage = {
          messageId: new Date().getUTCMilliseconds(),
          ...payload
        };

        friend.messages.push(newMessage);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsApi.fulfilled, (state, { payload }) => {
        state.friendsBack = [...payload];
      })
      .addCase(getRequestsApi.fulfilled, (state, { payload }) => {
        state.requests = [...payload];
      })
      .addCase(deleteFriend.fulfilled, (state, { payload }) => {
        state.friendsBack = state.friendsBack.filter(friend => friend.id != payload.friendId);
      })
      .addCase(respondRequest.fulfilled, (state, { payload }) => {
        state.requests = state.requests.filter(request => request.requestId != payload.requestId);
      })
      .addCase(getUnassociatedApi.fulfilled, (state, { payload }) => {
        state.unassociated = [...payload]
      })
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        const friend = state.friendsBack.find(friend => friend.id == payload.friendId)
        if (friend) { friend['messages'] = payload.messages }
      })

  },
  selectors: {
    getRequests: (state) => state.requests,
    getFriendsBack: (state) => state.friendsBack,
    getUnassociated: (state) => state.unassociated,
  }
});

export const { sendMessage, receiveMessage } = friendsSlice.actions
export const { getRequests, getFriendsBack, getUnassociated } = friendsSlice.selectors
export default friendsSlice.reducer;