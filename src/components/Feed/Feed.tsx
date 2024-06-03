import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../CreatePost/CreatePost'
import './Feed.scss'
import { newsfeedPostsSelector, userPostsSelector } from '../../store/features/post/postSlice';
import { getNewsfeed, getUserPosts } from '../../store/features/post/postThunks';
import { useEffect } from 'react';
import Post from '../Post/Post';
import { useLocation } from 'react-router-dom';

export default function Feed() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isNewsfeed = location.pathname === '/newsfeed';
  const posts = useSelector(isNewsfeed ? newsfeedPostsSelector : userPostsSelector);

  useEffect(() => {
    if (isNewsfeed) {
      dispatch(getNewsfeed());
    } else {
      dispatch(getUserPosts());
    }
  }, [dispatch, isNewsfeed]);

  return (
    <div className='Feed'>
      <CreatePost />

      <div className="Feed__list">
        {posts?.map((post) => (
          <Post key={post.postId} postData={post} />
        ))}
      </div>
    </div>
  )
}
