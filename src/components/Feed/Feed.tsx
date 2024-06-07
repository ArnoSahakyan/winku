import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../CreatePost/CreatePost'
import './Feed.scss'
import { PostState, newsfeedPostsSelector, userPostsSelector } from '../../store/features/post/postSlice';
import { getNewsfeed, getPostsById, getUserPosts } from '../../store/features/post/postThunks';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';
import { useLocation, useParams } from 'react-router-dom';
import { getUserID } from '../../store/features/userInfo/userInfoSlice';

export default function Feed() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isNewsfeed = location.pathname === '/newsfeed';
  const posts = useSelector(isNewsfeed ? newsfeedPostsSelector : userPostsSelector);
  const userId = useSelector(getUserID)
  const [userPosts, setUserPosts] = useState<PostState[]>([])
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPostsById(id))
        .then(res => setUserPosts(res.payload))
    }
    else if (isNewsfeed) {
      dispatch(getNewsfeed());
    } else {
      dispatch(getUserPosts());
    }
  }, [dispatch, isNewsfeed, id]);

  console.log(userPosts);


  return (
    <div className='Feed'>

      {
        id == userId
          ? <CreatePost />
          : null
      }

      {
        !location.pathname.startsWith('/user')
          ? <div className="Feed__list">
            {posts?.map((post) => (
              <Post key={post.postId} postData={post} />
            ))}
          </div>
          : <div className="Feed__list">
            {userPosts?.map((post) => (
              <Post key={post.postId} postData={post} />
            ))}
          </div>
      }

      <div className="Feed__list">
        {posts?.map((post) => (
          <Post key={post.postId} postData={post} />
        ))}
      </div>
    </div>
  )
}
