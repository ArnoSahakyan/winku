import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/axios';
import { PostState, TComments, TReplies } from './postSlice';
import { formType } from '../../../components/CreatePost/CreatePost';

type TcreateComment = {
  postId: number,
  content: string,
  uploaderId: number,
  parentId: number | null
}

export type TresponseComment = TReplies & {
  postId: number,
  userId: number
}

const VITE_BACK_BASE_URL = import.meta.env.VITE_BACK_BASE_URL as string;

const updatePfpPaths = (comments: (TComments | TReplies)[] | null): (TComments | TReplies)[] | null => {
  if (!comments || comments.length === 0) {
    return null;
  }

  return comments.map(comment => {
    const updatedComment = {
      ...comment,
      pfp: `${VITE_BACK_BASE_URL}${comment.pfp}`,
      createdAt: new Date(comment.createdAt)
    };

    if ((updatedComment as TComments).replies) {
      (updatedComment as TComments).replies = updatePfpPaths((updatedComment as TComments).replies) as TReplies[]; // Recursively update replies
    }

    return updatedComment;
  });
};

export const getUserPosts = createAsyncThunk('post/getUserPosts', async () => {
  const response = await api.get(`${VITE_BACK_BASE_URL}/api/userPosts`);
  const modifiedData = response.data.map((post: PostState) => ({
    ...post,
    image: post.image ? `${VITE_BACK_BASE_URL}${post.image}` : null,
    pfp: `${VITE_BACK_BASE_URL}${post.pfp}`,
    createdAt: new Date(post.createdAt),
    comments: updatePfpPaths(post.comments)
  }));
  return modifiedData;
});

export const getNewsfeed = createAsyncThunk('post/getNewsfeed', async () => {
  const response = await api.get(`${VITE_BACK_BASE_URL}/api/newsfeed`);
  const modifiedData = response.data.map((post: PostState) => ({
    ...post,
    image: post.image ? `${VITE_BACK_BASE_URL}${post.image}` : null,
    pfp: `${VITE_BACK_BASE_URL}${post.pfp}`,
    createdAt: new Date(post.createdAt),
    comments: updatePfpPaths(post.comments)
  }));
  return modifiedData;
});

export const createPost = createAsyncThunk('post/createPost', async (data: formType) => {
  const formData = new FormData();
  data.file ? formData.append('file', data.file) : null
  data.content ? formData.append('content', data.content) : null
  const response = await api.post(`${VITE_BACK_BASE_URL}/api/post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const responseData = {
    ...response.data,
    createdAt: new Date(response.data.createdAt)
  }
  return responseData
})

export const createComment = createAsyncThunk('post/createComment', async (data: TcreateComment) => {
  const response = await api.post<TresponseComment>(`${VITE_BACK_BASE_URL}/api/comment`, data)

  const modifiedData = {
    ...response.data,
    uploaderId: data.uploaderId,
    pfp: `${VITE_BACK_BASE_URL}${response.data.pfp}`,
    createdAt: new Date(response.data.createdAt),
    parentId: data.parentId
  }
  return modifiedData
})
