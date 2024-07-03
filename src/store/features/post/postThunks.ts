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

const url = import.meta.env.VITE_BACK_BASE_URL;

const updatePfpPaths = (comments: (TComments | TReplies)[] | null): (TComments | TReplies)[] | null => {
  if (!comments || comments.length === 0) {
    return null;
  }

  return comments.map(comment => {
    const updatedComment = {
      ...comment,
      createdAt: new Date(comment.createdAt)
    };

    if ((updatedComment as TComments).replies) {
      (updatedComment as TComments).replies = updatePfpPaths((updatedComment as TComments).replies) as TReplies[]; // Recursively update replies
    }

    return updatedComment;
  });
};

export const getUserPosts = createAsyncThunk('post/getUserPosts', async ({ limit, offset }: { limit: number, offset: number }) => {
  const response = await api.get(`${url}/api/user-posts`, {
    params: { limit, offset }
  });

  const modifiedData = response.data.data.map((post: PostState) => ({
    ...post,
    image: post.image ? post.image : null,
    createdAt: new Date(post.createdAt),
    comments: updatePfpPaths(post.comments)
  }));
  return {
    totalItems: response.data.totalItems,
    totalPages: response.data.totalPages,
    currentPage: response.data.currentPage,
    data: modifiedData,
    offset: offset
  };
});

export const getNewsfeed = createAsyncThunk('post/getNewsfeed', async ({ limit, offset }: { limit: number, offset: number }) => {
  const response = await api.get(`${url}/api/posts`, {
    params: { limit, offset }
  });
  const modifiedData = response.data.data.map((post: PostState) => ({
    ...post,
    image: post.image ? post.image : null,
    createdAt: new Date(post.createdAt),
    comments: updatePfpPaths(post.comments)
  }));

  return {
    totalItems: response.data.totalItems,
    totalPages: response.data.totalPages,
    currentPage: response.data.currentPage,
    data: modifiedData,
    offset: offset
  };
});

export const createPost = createAsyncThunk('post/createPost', async (data: formType) => {
  const formData = new FormData();
  data.file ? formData.append('file', data.file) : null
  data.content ? formData.append('content', data.content) : null
  const response = await api.post(`${url}/api/post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const responseData = {
    ...response.data,
    createdAt: new Date(response.data.createdAt)
  }
  return responseData;
})

export const deletePost = createAsyncThunk('post/deletePost', async (data: number) => {
  const response = await api.delete(`${url}/api/delete-post/${data}`);
  return response.data;
})

export const createComment = createAsyncThunk('post/createComment', async (data: TcreateComment) => {
  const response = await api.post(`${url}/api/comment`, data)

  const modifiedData = {
    ...response.data,
    uploaderId: data.uploaderId,
    createdAt: new Date(response.data.createdAt),
    parentId: data.parentId,
    replies: null
  }
  return modifiedData
})

export const likePost = createAsyncThunk('post/likePost', async (data: { postId: number, userId: number }) => {
  const response = await api.post(`${url}/api/like`, { postId: data.postId });
  const modifiedData = {
    ...response.data,
    posterId: data.userId
  }
  return modifiedData;
})

export const unlikePost = createAsyncThunk('post/unlikePost', async (data: { postId: number, userId: number }) => {
  const response = await api.post(`${url}/api/unlike`, { postId: data.postId });
  const modifiedData = {
    ...response.data,
    posterId: data.userId
  }
  return modifiedData;
})