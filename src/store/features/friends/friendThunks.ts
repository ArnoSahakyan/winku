import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/axios";
import { TFriend, TRequest, Tunassocitaed } from "./friendsSlice";

export const getFriendsApi = createAsyncThunk('friends_request/getFriends', async () => {
  const response = await api.get(`https://winkuback.onrender.com/api/friends`);
  const modifiedData = response.data.map((friend: TFriend) => ({
    ...friend,
    pfp: `https://winkuback.onrender.com${friend.pfp}`,
    messages: []
  }));
  return modifiedData;
});

export const getRequestsApi = createAsyncThunk('friends_request/getRequests', async () => {
  const response = await api.get(`https://winkuback.onrender.com/api/requests`);
  const modifiedData = response.data.map((request: TRequest) => ({
    ...request,
    pfp: `https://winkuback.onrender.com${request.pfp}`,
  }));
  return modifiedData;
});

export const getUnassociatedApi = createAsyncThunk('friends_request/getUnassociatedApi', async () => {
  const response = await api.get(`https://winkuback.onrender.com/api/unassociated-users`);
  const modifiedData = response.data.map((user: Tunassocitaed) => ({
    ...user,
    pfp: `https://winkuback.onrender.com${user.pfp}`,
  }));
  return modifiedData;
});

export const sendRequest = createAsyncThunk('friends_request/sendRequest', async (data: number) => {
  const newData = { receiverId: data }
  const response = await api.post(`https://winkuback.onrender.com/api/send-request`, newData);
  return response.data;
});

export const respondRequest = createAsyncThunk('friends_request/respondRequest', async (data: { senderId: number, status: string }, { dispatch }) => {
  const response = await api.post(`https://winkuback.onrender.com/api/respond-request`, data);
  dispatch(getFriendsApi())
  return response.data
});

export const deleteFriend = createAsyncThunk('friends_request/deleteFriend', async (data: number) => {
  const response = await api.delete(`https://winkuback.onrender.com/api/delete-friend/${data}`);
  return response.data;
});

export const getMessages = createAsyncThunk('friends_request/getMessages', async (data: number) => {
  const response = await api.get(`https://winkuback.onrender.com/api/messages/${data}`);
  return response.data;
});