import { useSelector } from 'react-redux';
import CreatePost from '../CreatePost/CreatePost'
import './Feed.scss'
import { getPosts } from '../../store/features/postSlice';
import Post from '../Post/Post';

export default function Feed() {
  const posts = useSelector(getPosts);

  return (
    <div className='Feed'>
      <CreatePost />

      <div className="Feed__list">
        {posts.map((post, index) => (
          <Post key={index} postData={post} />
        ))}
      </div>
    </div>
  )
}
