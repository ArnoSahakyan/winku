import { useEffect, useState } from 'react'
import './Photos.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/features/post/postThunks';
import { userPostsSelector } from '../../../store/features/post/postSlice';
import Reload from '../../../components/shared/Reload/Reload';
import { AppDispatch } from '../../../store/setup';
import { ServerResponse } from '../../../components/Feed/Feed';

export default function Photos() {
  const pictures = useSelector(userPostsSelector)
  const dispatch = useDispatch<AppDispatch>();
  const limit = 3;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const callNewPosts = (limit: number, offset: number) => {
    if (currentPage < totalPages! || totalPages === null) {
      dispatch(getUserPosts({ limit, offset }))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            const { totalPages } = response.payload as ServerResponse;
            setOffset(offset + limit);
            setCurrentPage(currentPage + 1);
            setTotalPages(totalPages);
          }
        });
    }
  }

  useEffect(() => {
    if (pictures.data.length === 0) {
      if (totalPages !== 0) {
        dispatch(getUserPosts({ limit, offset }))
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              const { totalPages } = response.payload as ServerResponse;
              setOffset(offset + limit);
              setTotalPages(totalPages);
            }
          });
      }
    }
  }, [dispatch, offset, pictures.data.length, totalPages]);

  return (
    <div className='Photos'>
      {
        pictures.data.filter(elem => elem.image).length === 0
          ? <p className='no-users'>no pictures available</p>
          : pictures.data.map(pic =>
            pic.image && <div key={pic.postId} className="Photos__img">
              <img src={pic.image} alt={`Post N${pic.postId.toString()}`} />
            </div>
          )
      }
      {pictures.data.filter(elem => elem.image).length > 0 && (totalPages && currentPage < totalPages) && (
        <Reload func={() => callNewPosts(limit, offset)} />
      )}
    </div>
  )
}
