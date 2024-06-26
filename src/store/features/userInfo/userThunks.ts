import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../../../api/axios';
import { Tunassocitaed } from '../friends/friendsSlice';
const url = import.meta.env.VITE_BACK_BASE_URL;

type SignupData = {
  username: string;
  email: string;
  password: string;
};

type LoginData = Omit<SignupData, 'email'>;

export type TsearchedUsers = Tunassocitaed & {
  email: string;
  onlineStatus: string;
}

export const signupUser = createAsyncThunk(
  'userInfo/signupAsync',
  async (data: SignupData) => {
    const response = await axios.post(`${url}/api/auth/signup`, data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'userInfo/loginAsync',
  async (data: LoginData) => {
    const response = await axios.post(`${url}/api/auth/signin`, data);
    return response.data;
  }
);

export const changePfp = createAsyncThunk(
  'userInfo/changePfpAsync',
  async (data: File | undefined) => {
    if (data) {
      const formData = new FormData();
      formData.append('file', data);
      const response = await api.post(`${url}/api/upload/pfp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }
    else return;
  }
);

export const changeCover = createAsyncThunk(
  'userInfo/changeCoverAsync',
  async (data: File | undefined) => {
    if (data) {
      const formData = new FormData();
      formData.append('file', data);

      const response = await api.post(`${url}/api/upload/cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }
    else return;

  }
);

export const changeOnlineStatus = createAsyncThunk('userInfo/changeOnlineStatus',
  async (data: { onlineStatus: string }) => {
    const response = await api.patch(`${url}/api/user/status`, data)
    return response.data
  }
)

export const changeUserData = createAsyncThunk('userInfo/changeUserData',
  async (data: { fname: string, job: string }) => {
    const response = await api.patch(`${url}/api/user/update`, data)
    return response.data
  }
)

export const searchUsers = createAsyncThunk('user/searchUser',
  async ({ query, limit, offset }: { query: string, limit: number, offset: number }) => {
    const response = await api.get('${url}/api/searchUser', {
      params: {
        query,
        limit,
        offset
      }
    });
    const modifiedData = response.data.users.map((user: TsearchedUsers) => ({
      ...user,
      pfp: `${url}${user.pfp}`,
    }))

    return {
      totalUsers: response.data.totalUsers,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
      users: modifiedData,
    };
  }
)