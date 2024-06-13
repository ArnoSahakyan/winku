import { useEffect } from 'react'
import './Photos.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/features/post/postThunks';
import { userPostsSelector } from '../../../store/features/post/postSlice';

export default function Photos() {
  const pictures = useSelector(userPostsSelector)

  const dispatch = useDispatch();

  useEffect(() => {
    if (pictures.length == 0) {
      dispatch(getUserPosts());
    }
  }, [dispatch, pictures.length]);

  return (
    <div className='Photos'>
      {
        pictures.map(pic => {
          return <div key={pic.postId} className="Photos__img">
            <img src={pic.image} alt={`Post N${pic.postId.toString()}`} />
          </div>
        })
      }
    </div>
  )
}
