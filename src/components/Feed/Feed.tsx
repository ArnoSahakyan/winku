import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../CreatePost/CreatePost';
import './Feed.scss';
import { newsfeedPostsSelector, userPostsSelector } from '../../store/features/post/postSlice';
import { getNewsfeed, getUserPosts } from '../../store/features/post/postThunks';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { useLocation } from 'react-router-dom';
import Reload from '../shared/Reload/Reload'

export default function Feed() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isNewsfeed = location.pathname === '/newsfeed';
  const posts = useSelector(isNewsfeed ? newsfeedPostsSelector : userPostsSelector);
  const limit = 3;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const callNewPosts = (limit, offset) => {
    if (currentPage < totalPages || totalPages === null) {
      if (isNewsfeed) {
        dispatch(getNewsfeed({ limit, offset }))
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              const { totalPages } = response.payload;
              setOffset(offset + limit);
              setCurrentPage(currentPage + 1);
              setTotalPages(totalPages);
            }
          });
      } else {
        dispatch(getUserPosts({ limit, offset }))
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              const { totalPages } = response.payload;
              setOffset(offset + limit);
              setCurrentPage(currentPage + 1);
              setTotalPages(totalPages);
            }
          });
      }
    }
  };

  useEffect(() => {
    if (isNewsfeed) {
      if (posts.length === 0) {
        dispatch(getNewsfeed({ limit, offset }))
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              const { totalPages } = response.payload;
              setOffset(offset + limit);
              setTotalPages(totalPages);
            }
          });
      }
    } else {
      if (posts.length === 0) {
        if (totalPages !== 0) {
          dispatch(getUserPosts({ limit, offset }))
            .then((response) => {
              if (response.meta.requestStatus === 'fulfilled') {
                const { totalPages } = response.payload;
                setOffset(offset + limit);
                setTotalPages(totalPages);
              }
            });
        }
      }
    }
  }, [dispatch, isNewsfeed, posts.length, offset, limit, totalPages]);

  return (
    <div className='Feed'>
      <CreatePost />

      <div className="Feed__list">
        {
          posts.length === 0
            ? <p className='no-users'>no posts available</p>
            : posts?.map((post) => (
              <Post key={post.postId} postData={post} />
            ))
        }

        {posts.length > 0 && (totalPages && currentPage < totalPages) && (
          <Reload func={() => callNewPosts(limit, offset)} />
        )}
      </div>
    </div>
  );
}
