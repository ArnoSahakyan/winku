import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../CreatePost/CreatePost';
import { PostState, newsfeedPostsSelector, postCreateLoading, postGetLoading, userPostsSelector } from '../../store/features/post/postSlice';
import { getNewsfeed, getUserPosts } from '../../store/features/post/postThunks';
import { useEffect } from 'react';
import Post from '../Post/Post';
import { useLocation } from 'react-router-dom';
import Reload from '../shared/Reload/Reload';
import { AppDispatch } from '../../store/setup';
import './Feed.scss';
import PostSkeleton from '../shared/Skeletons/PostSkeleton';

export type ServerResponse = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: PostState[];
};

export default function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isNewsfeed = location.pathname === '/newsfeed';
  const posts = useSelector(isNewsfeed ? newsfeedPostsSelector : userPostsSelector);
  const limit = 3;
  const createLoading = useSelector(postCreateLoading);
  const loading = useSelector(postGetLoading);

  const callNewPosts = (limit: number, offset: number) => {
    if (posts.currentPage < posts.totalPages! || posts.totalPages === null) {
      if (isNewsfeed) {
        dispatch(getNewsfeed({ limit, offset }))
      } else {
        dispatch(getUserPosts({ limit, offset }))
      }
    }
  };

  useEffect(() => {
    if (posts.data.length === 0) {
      if (isNewsfeed) {
        dispatch(getNewsfeed({ limit, offset: posts.offset }))
      } else {
        if (posts.totalPages !== 0) {
          dispatch(getUserPosts({ limit, offset: posts.offset }))
        }
      }
    }
  }, [dispatch, isNewsfeed, limit]);

  const handleReload = () => {
    callNewPosts(limit, posts.offset + limit);
  };

  return (
    <div className='Feed'>
      {!isNewsfeed && <CreatePost />}

      <div className="Feed__list">
        {
          createLoading && <PostSkeleton />
        }
        {
          (
            loading && posts.data.length === 0 &&
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )
          ||
          (
            posts.data.length === 0
              ? <p className={`${isNewsfeed ? 'newsfeed' : ''} no-users`}>no posts available</p>
              : posts.data.map((post) => (
                <Post key={post.postId} postData={post} />
              ))
          )
        }

        {loading && posts.data.length > 0 && <PostSkeleton />}

        {!loading && posts.data.length > 0 && (posts.totalPages && posts.currentPage < posts.totalPages) && (
          <Reload func={handleReload} />
        )}
      </div>
    </div>
  );
}
