import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { api } from '../../../api/axios';
import { TuserInfo } from './userInfoSlice';

const VITE_BACK_BASE_URL = import.meta.env.VITE_BACK_BASE_URL as string;

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
      const response = await axios.post<SignupResponse>(`${VITE_BACK_BASE_URL}/api/auth/signup`, data);
      console.log('Signup Response:', response);
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
      console.log("Login Data: ", data);
      const response = await axios.post<LoginResponse>(`${VITE_BACK_BASE_URL}/api/auth/signin`, data);
      console.log('Login Response:', response);
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

      const response = await api.post<UploadResponse>(`${VITE_BACK_BASE_URL}/api/upload/pfp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Profile Picture Upload Response:", response.data);

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

      const response = await api.post<UploadResponse>(`${VITE_BACK_BASE_URL}/api/upload/cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Upload response", response);
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
    const response = await api.patch(`${VITE_BACK_BASE_URL}/api/user/status`, modifiedData)
    return response.data
  }
)

export const changeUserData = createAsyncThunk('userInfo/changeUserData',
  async (data) => {
    const response = await api.patch(`${VITE_BACK_BASE_URL}/api/user/update`, data)
    return response.data
  }
)