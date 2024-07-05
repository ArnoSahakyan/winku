import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../../store/features/post/postThunks';
import { postGetLoading, userPostsSelector } from '../../../store/features/post/postSlice';
import Reload from '../../../components/shared/Reload/Reload';
import { AppDispatch } from '../../../store/setup';
import './Photos.scss'
import PhotoSkeleton from '../../../components/shared/Skeletons/PhotoSkeleton';

export default function Photos() {
  const pictures = useSelector(userPostsSelector)
  const dispatch = useDispatch<AppDispatch>();
  const limit = 3;
  const loading = useSelector(postGetLoading);

  const callNewPosts = (limit: number, offset: number) => {
    if (pictures.currentPage < pictures.totalPages! || pictures.totalPages === null) {
      dispatch(getUserPosts({ limit, offset }))
    }
  }

  useEffect(() => {
    if (pictures.data.length === 0) {
      if (pictures.totalPages !== 0) {
        dispatch(getUserPosts({ limit, offset: pictures.offset }))
      }
    }
  }, [dispatch, limit]);

  const handleReload = () => {
    callNewPosts(limit, pictures.offset + limit);
  };

  console.log("LOADING PICTURES", loading);


  return (
    <div className='Photos'>
      {
        (loading &&
          <>
            <PhotoSkeleton />
            <PhotoSkeleton />
            <PhotoSkeleton />
          </>)
        ||
        (pictures.data.filter(elem => elem.image).length === 0
          ? <p className='no-users'>no pictures available</p>
          : pictures.data.map(pic =>
            pic.image && <div key={pic.postId} className="Photos__img">
              <img src={pic.image} alt={`Post N${pic.postId.toString()}`} />
            </div>
          ))
      }
      {pictures.data.filter(elem => elem.image).length > 0 && (pictures.totalPages && pictures.currentPage < pictures.totalPages) && (
        <Reload func={handleReload} />
      )}
    </div>
  )
}
