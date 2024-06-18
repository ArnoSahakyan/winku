import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { api } from '../../../api/axios';
import { TuserInfo } from './userInfoSlice';

type APIError = {
  message: string;
}

interface LoginResponse {
  data: TuserInfo;
  status: number;
  statusText: string;
  headers: {
    [key: string]: string;
  };
  config: unknown;
  request: unknown;
}

interface SignupResponse {
  data: APIError;
}

interface UploadResponse {
  data: {
    relativePath: string;
  };
}

export type TuploadValues = {
  file: File | undefined;
};

type SignupData = {
  username: string;
  email: string;
  password: string;
};

type LoginData = Omit<SignupData, 'email'>;

export const signupUser = createAsyncThunk<SignupResponse, SignupData, { rejectValue: APIError }>(
  'userInfo/signupAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<SignupResponse>(`/api/api/auth/signup`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<APIError>;
      console.error('Signup Error:', axiosError);
      return rejectWithValue(axiosError.response?.data || { message: 'An unknown error occurred' });
    }
  }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginData, { rejectValue: APIError }>(
  'userInfo/loginAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(`/api/api/auth/signin`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<APIError>;
      console.error('Login Error:', axiosError);
      return rejectWithValue(axiosError.response?.data || { message: 'An unknown error occurred' });
    }
  }
);

export const changePfp = createAsyncThunk<UploadResponse, TuploadValues, { rejectValue: APIError }>(
  'userInfo/changePfpAsync',
  async ({ file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post<UploadResponse>(`/api/upload/pfp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<APIError>;
      return rejectWithValue(axiosError.response?.data || { message: 'An unknown error occurred' });
    }
  }
);

export const changeCover = createAsyncThunk<UploadResponse, TuploadValues, { rejectValue: APIError }>(
  'userInfo/changeCoverAsync',
  async ({ file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post<UploadResponse>(`/api/upload/cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<APIError>;
      return rejectWithValue(axiosError.response?.data || { message: 'An unknown error occurred' });
    }
  }
);

export const changeOnlineStatus = createAsyncThunk('userInfo/changeOnlineStatus',
  async (data) => {
    const modifiedData = { onlineStatus: data }
    const response = await api.patch(`/api/user/status`, modifiedData)
    return response.data
  }
)

export const changeUserData = createAsyncThunk('userInfo/changeUserData',
  async (data) => {
    const response = await api.patch(`/api/user/update`, data)
    return response.data
  }
)

export const searchUsers = createAsyncThunk('user/searchUser',
  async ({ query, limit, offset }) => {
    const response = await api.get('/api/searchUser', {
      params: {
        query,
        limit,
        offset
      }
    });
    console.log("SEARCH USER RESPONSE", response.data);
    const modifiedData = response.data.users.map((user) => ({
      ...user,
      pfp: `/api${user.pfp}`,
    }))

    return {
      totalUsers: response.data.totalUsers,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
      users: modifiedData,
    };
  }
)