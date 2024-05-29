import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { api } from '../../../api/axios';

const VITE_BACK_BASE_URL = import.meta.env.VITE_BACK_BASE_URL

export const signupUser = createAsyncThunk('userInfo/signupAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_BACK_BASE_URL}api/auth/signup`, data);
      console.log('Signup Response:', response);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Signup Error:', axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk('userInfo/loginAsync',
  async (data, { rejectWithValue }) => {
    try {
      console.log("Login Data: ", data);
      const response = await axios.post(`${VITE_BACK_BASE_URL}api/auth/signin`, data);
      console.log('Login Response:', response);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Login Error:', axiosError);
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

// export const changePfp = createAsyncThunk(
//   'userInfo/changePfpAsync',
//   async (file, { rejectWithValue }) => {
//     try {
//       console.log("Upload Data: ", file);

//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await axios.post(`${VITE_BACK_BASE_URL}api/upload`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log('Upload Response:', response);
//       return response.data;
//     } catch (error) {
//       const axiosError = error;
//       console.error('Upload Error:', axiosError);
//       return rejectWithValue(axiosError.response?.data);
//     }
//   }
// );

export const changePfp = createAsyncThunk(
  'userInfo/changePfpAsync',
  async ({ userID, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('userID', userID);
      formData.append('file', file);

      const response = await api.post(`${VITE_BACK_BASE_URL}api/upload/pfp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("1111111111111", response.data);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);


export const changeCover = createAsyncThunk(
  'userInfo/changeCoverAsync',
  async ({ userID, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('userID', userID);
      formData.append('file', file);

      const response = await api.post(`${VITE_BACK_BASE_URL}api/upload/cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);