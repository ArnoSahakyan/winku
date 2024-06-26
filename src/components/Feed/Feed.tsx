import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../CreatePost/CreatePost';
import { PostState, newsfeedPostsSelector, postCreateLoading, postGetLoading, userPostsSelector } from '../../store/features/post/postSlice';
import { getNewsfeed, getUserPosts } from '../../store/features/post/postThunks';
import { useEffect, useState } from 'react';
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
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const createLoading = useSelector(postCreateLoading);
  const loading = useSelector(postGetLoading);

  const callNewPosts = (limit: number, offset: number) => {
    if (currentPage < totalPages! || totalPages === null) {
      if (isNewsfeed) {
        dispatch(getNewsfeed({ limit, offset }))
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              const { totalPages } = response.payload as ServerResponse;
              setOffset((prevOffset) => prevOffset + limit);
              setCurrentPage((prevPage) => prevPage + 1);
              setTotalPages(totalPages);
            }
          });
      } else {
        dispatch(getUserPosts({ limit, offset }))
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              const { totalPages } = response.payload as ServerResponse;
              setOffset((prevOffset) => prevOffset + limit);
              setCurrentPage((prevPage) => prevPage + 1);
              setTotalPages(totalPages);
            }
          });
      }
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      if (isNewsfeed) {
        dispatch(getNewsfeed({ limit, offset }))
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              const { totalPages } = response.payload as ServerResponse;
              setOffset(o => o + limit)
              setTotalPages(totalPages);
            }
          });
      } else {
        if (totalPages !== 0) {
          dispatch(getUserPosts({ limit, offset }))
            .then((response) => {
              if (response.meta.requestStatus === 'fulfilled') {
                const { totalPages } = response.payload as ServerResponse;
                setOffset(o => o + limit)
                setTotalPages(totalPages);
              }
            });
        }
      }
    }
  }, [dispatch, isNewsfeed, limit]);

  const handleReload = () => {
    callNewPosts(limit, offset);
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
            loading && posts.length === 0 &&
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )
          ||
          (
            posts.length === 0
              ? <p className={`${isNewsfeed ? 'newsfeed' : ''} no-users`}>no posts available</p>
              : posts.map((post) => (
                <Post key={post.postId} postData={post} />
              ))
          )
        }

        {
          loading && posts.length > 0 && <PostSkeleton />
        }

        {!loading && posts.length > 0 && (totalPages && currentPage < totalPages) && (
          <Reload func={handleReload} />
        )}
      </div>
    </div>
  );
}
