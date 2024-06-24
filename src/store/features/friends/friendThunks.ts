import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api/axios";

export const getFriendsApi = createAsyncThunk('friends_request/getFriends', async () => {
  const response = await api.get(`/api/friends`);
  const modifiedData = response.data.map((friend) => ({
    ...friend,
    pfp: `/api${friend.pfp}`,
    messages: []
  }));
  return modifiedData;
});

export const getRequestsApi = createAsyncThunk('friends_request/getRequests', async () => {
  const response = await api.get(`/api/requests`);
  const modifiedData = response.data.map((request) => ({
    ...request,
    pfp: `/api${request.pfp}`,
  }));
  return modifiedData;
});

export const getUnassociatedApi = createAsyncThunk('friends_request/getUnassociatedApi', async () => {
  const response = await api.get(`/api/unassociated-users`);
  const modifiedData = response.data.map((user) => ({
    ...user,
    pfp: `/api${user.pfp}`,
  }));
  return modifiedData;
});

export const sendRequest = createAsyncThunk('friends_request/sendRequest', async (data) => {
  const newData = { receiverId: data }
  const response = await api.post(`/api/send-request`, newData);
  return response.data;
});

export const respondRequest = createAsyncThunk('friends_request/respondRequest', async (data, { dispatch }) => {
  const response = await api.post(`/api/respond-request`, data);
  dispatch(getFriendsApi())
  return response.data
});

export const deleteFriend = createAsyncThunk('friends_request/deleteFriend', async (data) => {
  const response = await api.delete(`/api/delete-friend/${data}`);
  return response.data;
});

export const getMessages = createAsyncThunk('friends_request/getMessages', async (data) => {
  const response = await api.get(`/api/messages/${data}`);
  return response.data;
});