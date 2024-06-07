import { createSlice } from "@reduxjs/toolkit";
import { createComment, createPost, getNewsfeed, getUserPosts } from "./postThunks";

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
  image: string | null;
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
  error: string | undefined
}

const initialState: TpostInitialState = {
  userPosts: [],
  newsfeedPosts: [],
  loading: false,
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
  reducers: {
    // setPost: (state, action) => {
    //   console.log('AAA');

    // },
    // postComment: (state, { payload }) => {
    //   console.log('AAA');
    // }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.fulfilled, (state, { payload }) => {
        state.userPosts = [...payload]
      })
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(getNewsfeed.fulfilled, (state, { payload }) => {
        state.newsfeedPosts = [...payload]
      })
      .addCase(getNewsfeed.pending, (state) => {
        state.loading = true
      })
      .addCase(getNewsfeed.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(createPost.fulfilled, (state, { payload }) => {
        const modifiedData = {
          ...payload,
          image: payload.image ? `${import.meta.env.VITE_BACK_BASE_URL}${payload.image}` : null,
          pfp: `${import.meta.env.VITE_BACK_BASE_URL}${payload.pfp}`
        };
        state.userPosts.unshift(modifiedData)
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(createComment.fulfilled, (state, { payload }) => {
        if (payload.uploaderId === payload.userId) {
          const post = state.userPosts.find(post => post.postId === payload.postId);
          if (post) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { uploaderId, ...comment } = payload;
            addComment(post, comment);
          }
        } else {
          const post = state.newsfeedPosts.find(post => post.postId === payload.postId);
          if (post) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { uploaderId, ...comment } = payload;
            addComment(post, comment);
          }
        }
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true
      })
      .addCase(createComment.rejected, (state, action) => {
        state.error = action.error.message;
      })

  },
  selectors: {
    userPostsSelector: state => state.userPosts,
    newsfeedPostsSelector: state => state.newsfeedPosts
  }
});

// export const { setPost, postComment } = postSlice.actions;
export const { userPostsSelector, newsfeedPostsSelector } = postSlice.selectors
export default postSlice.reducer;