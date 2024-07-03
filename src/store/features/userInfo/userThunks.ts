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

type TimageType = {
  file: File | undefined;
  type: string
}

export type TsearchedUsers = Tunassocitaed & {
  email: string;
  onlineStatus: string;
}

export const signupUser = createAsyncThunk(
  'userInfo/signupAsync',
  async (data: SignupData) => {
    const response = await axios.post(`${url}/api/auth/signup`, data,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'userInfo/loginAsync',
  async (data: LoginData) => {
    const response = await axios.post(`${url}/api/auth/signin`, data,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const changeUserImage = createAsyncThunk(
  'userInfo/changePfpAsync',
  async (data: TimageType) => {
    if (data) {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('type', data.type)
      const response = await api.post(`${url}/api/upload/user-images`, formData, {
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
    const response = await api.get(`${url}/api/search-user`, {
      params: {
        query,
        limit,
        offset
      }
    });

    return {
      totalUsers: response.data.totalUsers,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
      users: response.data.users,
    };
  }
)