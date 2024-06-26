import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/axios";
import { TFriend, TRequest, Tunassocitaed } from "./friendsSlice";
const url = import.meta.env.VITE_BACK_BASE_URL;

export const getFriendsApi = createAsyncThunk('friends_request/getFriends', async () => {
  const response = await api.get(`${url}/api/friends`);
  const modifiedData = response.data.map((friend: TFriend) => ({
    ...friend,
    pfp: `${url}${friend.pfp}`,
    messages: []
  }));
  return modifiedData;
});

export const getRequestsApi = createAsyncThunk('friends_request/getRequests', async () => {
  const response = await api.get(`${url}/api/requests`);
  const modifiedData = response.data.map((request: TRequest) => ({
    ...request,
    pfp: `${url}${request.pfp}`,
  }));
  return modifiedData;
});

export const getUnassociatedApi = createAsyncThunk('friends_request/getUnassociatedApi', async () => {
  const response = await api.get(`${url}/api/unassociated-users`);
  const modifiedData = response.data.map((user: Tunassocitaed) => ({
    ...user,
    pfp: `${url}${user.pfp}`,
  }));
  return modifiedData;
});

export const sendRequest = createAsyncThunk('friends_request/sendRequest', async (data: number) => {
  const newData = { receiverId: data }
  const response = await api.post(`${url}/api/send-request`, newData);
  return response.data;
});

export const respondRequest = createAsyncThunk('friends_request/respondRequest', async (data: { senderId: number, status: string }, { dispatch }) => {
  const response = await api.post(`${url}/api/respond-request`, data);
  dispatch(getFriendsApi())
  return response.data
});

export const deleteFriend = createAsyncThunk('friends_request/deleteFriend', async (data: number) => {
  const response = await api.delete(`${url}/api/delete-friend/${data}`);
  return response.data;
});

export const getMessages = createAsyncThunk('friends_request/getMessages', async (data: number) => {
  const response = await api.get(`${url}/api/messages/${data}`);
  return response.data;
});