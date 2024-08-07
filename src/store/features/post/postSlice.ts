import { createSlice } from "@reduxjs/toolkit";
import { createComment, createPost, deletePost, getNewsfeed, getUserPosts, likePost, unlikePost } from "./postThunks";

export type TReplies = {
  commentId: number;
  content: string;
  createdAt: Date;
  fname: string;
  parentId: number | null;
  pfp: string;
};

export type TComments = TReplies & {
  replies: TReplies[] | null;
};

export type PostState = {
  postId: number;
  content: string | null;
  image: string | undefined;
  likeCount: number;
  createdAt: Date;
  fname: string;
  pfp: string;
  userId: number;
  comments: TComments[] | null;
  likedByUser: boolean;
};

type TpostInitialState = {
  userPosts: {
    data: PostState[],
    currentPage: number,
    totalPages: number | undefined,
    totalItems: number | undefined
    offset: number
  },
  newsfeedPosts: {
    data: PostState[],
    currentPage: number,
    totalPages: number | undefined,
    totalItems: number | undefined
    offset: number
  },
  loading: boolean,
  createLoading: boolean,
  deleteLoading: { loading: boolean, postId: number | undefined },
  commentLoading: { loading: boolean, postId: number | undefined },
  error: string | undefined
}

const initialState: TpostInitialState = {
  userPosts: {
    data: [],
    currentPage: 1,
    totalPages: undefined,
    totalItems: undefined,
    offset: 0
  },
  newsfeedPosts: {
    data: [],
    currentPage: 1,
    totalPages: undefined,
    totalItems: undefined,
    offset: 0
  },
  loading: false,
  createLoading: false,
  deleteLoading: { loading: false, postId: undefined },
  commentLoading: { loading: false, postId: undefined },
  error: undefined
}

const addComment = (post: PostState, comment: TComments) => {
  if (comment.parentId) {
    const parentComment = post.comments!.find(c => c.commentId === comment.parentId);
    if (parentComment) {
      if (!parentComment.replies) {
        parentComment.replies = [];
      }
      parentComment.replies.push(comment);
    }
  } else {
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(comment);
  }
};

const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.fulfilled, (state, { payload, meta }) => {
        if (meta.arg.offset === 0) {
          state.userPosts = payload;
        } else {
          state.userPosts.data.push(...payload.data);
          state.userPosts.currentPage = payload.currentPage;
          state.userPosts.offset = payload.offset;
          state.userPosts.totalItems = payload.totalItems;
          state.userPosts.totalPages = payload.totalPages
        }
        state.loading = false;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(getNewsfeed.fulfilled, (state, { payload, meta }) => {
        if (meta.arg.offset === 0) {
          state.newsfeedPosts = payload;
        } else {
          state.newsfeedPosts.data.push(...payload.data);
          state.newsfeedPosts.currentPage = payload.currentPage;
          state.newsfeedPosts.offset = payload.offset;
          state.newsfeedPosts.totalItems = payload.totalItems;
          state.newsfeedPosts.totalPages = payload.totalPages
        }
        state.loading = false;
      })
      .addCase(getNewsfeed.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getNewsfeed.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(createPost.fulfilled, (state, { payload }) => {
        const modifiedData = {
          ...payload,
          image: payload.image ? payload.image : null,
        };
        state.userPosts.data.unshift(modifiedData)
        state.createLoading = false
      })
      .addCase(createPost.pending, (state) => {
        state.createLoading = true
        state.error = undefined;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
        state.createLoading = false
      })

      .addCase(likePost.fulfilled, (state, { payload }) => {
        if (payload.posterId === payload.userId) {
          const post = state.userPosts.data.find(post => post.postId === payload.postId);
          post.likeCount = post.likeCount + 1;
          post.likedByUser = true
        } else {
          const post = state.newsfeedPosts.data.find(post => post.postId === payload.postId);
          post.likeCount = post.likeCount + 1;
          post.likedByUser = true
        }
      })
      .addCase(likePost.rejected, (state, { error }) => {
        state.error = error.message
      })

      .addCase(unlikePost.fulfilled, (state, { payload }) => {
        if (payload.posterId === payload.userId) {
          const post = state.userPosts.data.find(post => post.postId === payload.postId);
          post.likeCount = post.likeCount - 1;
          post.likedByUser = false
        } else {
          const post = state.newsfeedPosts.data.find(post => post.postId === payload.postId);
          post.likeCount = post.likeCount - 1;
          post.likedByUser = false
        }
      })
      .addCase(unlikePost.rejected, (state, { error }) => {
        state.error = error.message
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.userPosts.data = state.userPosts.data.filter(post => post.postId != action.payload.postId)
        state.deleteLoading = { loading: false, postId: undefined };
      })
      .addCase(deletePost.pending, (state, action) => {
        state.deleteLoading = { loading: true, postId: action.meta.arg };
        state.error = undefined;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message;
        state.deleteLoading = { loading: false, postId: undefined };
      })

      .addCase(createComment.fulfilled, (state, action) => {
        if (action.payload.uploaderId === action.payload.userId) {
          const post = state.userPosts.data.find(post => post.postId === action.payload.postId);
          if (post) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { uploaderId, ...comment } = action.payload;
            addComment(post, comment);
          }
        } else {
          const post = state.newsfeedPosts.data.find(post => post.postId === action.payload.postId);
          if (post) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { uploaderId, ...comment } = action.payload;
            addComment(post, comment);
          }
        }
        state.commentLoading = { loading: false, postId: undefined };
      })
      .addCase(createComment.pending, (state, action) => {
        state.commentLoading = { loading: true, postId: action.meta.arg.postId };
        state.error = undefined;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.error = action.error.message;
        state.commentLoading = { loading: false, postId: undefined };
      })

  },
  selectors: {
    userPostsSelector: state => state.userPosts,
    newsfeedPostsSelector: state => state.newsfeedPosts,
    postGetLoading: state => state.loading,
    postCreateLoading: state => state.createLoading,
    postDeleteLoading: state => state.deleteLoading,
    postCommentLoading: state => state.commentLoading,
    postError: state => state.error
  }
});

export const { userPostsSelector, newsfeedPostsSelector, postGetLoading, postCreateLoading, postDeleteLoading, postCommentLoading, postError } = postSlice.selectors
export default postSlice.reducer;