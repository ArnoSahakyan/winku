import { useEffect, useState } from 'react'
import './Photos.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/features/post/postThunks';
import { userPostsSelector } from '../../../store/features/post/postSlice';
import Reload from '../../../components/shared/Reload/Reload';

export default function Photos() {
  const pictures = useSelector(userPostsSelector)
  const dispatch = useDispatch();
  const limit = 3;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const callNewPosts = (limit, offset) => {
    if (currentPage < totalPages || totalPages === null) {
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

  useEffect(() => {
    if (pictures.length === 0) {
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
  }, [dispatch, offset, pictures.length, totalPages]);

  return (
    <div className='Photos'>
      {
        pictures.length === 0
          ? <p className='no-users'>no pictures available</p>
          : pictures.map(pic => {
            return <div key={pic.postId} className="Photos__img">
              <img src={pic.image} alt={`Post N${pic.postId.toString()}`} />
            </div>
          })
      }
      {pictures.length > 0 && (totalPages && currentPage < totalPages) && (
        <Reload func={() => callNewPosts(limit, offset)} />
      )}
    </div>
  )
}
