import { createSlice } from "@reduxjs/toolkit";
import { createComment, createPost, deletePost, getNewsfeed, getUserPosts } from "./postThunks";

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
  likes: number;
  createdAt: Date;
  fname: string;
  pfp: string;
  userId: number;
  comments: TComments[] | null;
};

type TpostInitialState = {
  userPosts: PostState[],
  newsfeedPosts: PostState[],
  loading: boolean,
  createLoading: boolean,
  deleteLoading: { loading: boolean, postId: number | undefined },
  commentLoading: { loading: boolean, postId: number | undefined },
  error: string | undefined
}

const initialState: TpostInitialState = {
  userPosts: [],
  newsfeedPosts: [],
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
          state.userPosts = payload.data;
        } else {
          state.userPosts.push(...payload.data);
        }
        state.loading = false;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(getNewsfeed.fulfilled, (state, { payload, meta }) => {
        if (meta.arg.offset === 0) {
          state.newsfeedPosts = payload.data;
        } else {
          state.newsfeedPosts.push(...payload.data);
        }
        state.loading = false;
      })
      .addCase(getNewsfeed.pending, (state) => {
        state.loading = true;
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
        state.userPosts.unshift(modifiedData)
        state.createLoading = false
      })
      .addCase(createPost.pending, (state) => {
        state.createLoading = true
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
        state.createLoading = false
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.userPosts = state.userPosts.filter(post => post.postId != action.payload.postId)
        state.deleteLoading = { loading: false, postId: undefined };
      })
      .addCase(deletePost.pending, (state, action) => {
        state.deleteLoading = { loading: true, postId: action.meta.arg };
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message;
        state.deleteLoading = { loading: false, postId: undefined };
      })

      .addCase(createComment.fulfilled, (state, action) => {
        if (action.payload.uploaderId === action.payload.userId) {
          const post = state.userPosts.find(post => post.postId === action.payload.postId);
          if (post) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { uploaderId, ...comment } = action.payload;
            addComment(post, comment);
          }
        } else {
          const post = state.newsfeedPosts.find(post => post.postId === action.payload.postId);
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