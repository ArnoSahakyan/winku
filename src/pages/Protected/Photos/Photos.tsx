import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getUserPhotos } from '../../../store/features/post/postThunks';
import Reload from '../../../components/shared/Reload/Reload';
import { AppDispatch } from '../../../store/setup';
import './Photos.scss'
import PhotoSkeleton from '../../../components/shared/Skeletons/PhotoSkeleton';

type Tpictures = {
  totalPages: number,
  currentPage: number,
  offset: number,
  data: {
    postId: number,
    image: string
  }[],
}

export default function Photos() {
  const [pictures, setPictures] = useState([])
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const limit = 3;

  const callNewPosts = (limit: number, offset: number) => {
    if (currentPage < totalPages || totalPages === null) {
      setLoading(true);
      dispatch(getUserPhotos({ limit, offset }))
        .then(res => {
          const payload = res.payload as Tpictures;
          setTotalPages(payload.totalPages)
          setPictures(pictures => [...pictures, ...payload.data])
          setCurrentPage(payload.currentPage)
          setOffset(payload.offset)
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    if (pictures.length === 0) {
      if (totalPages !== 0) {
        setLoading(true);
        dispatch(getUserPhotos({ limit, offset }))
          .then(res => {
            const payload = res.payload as Tpictures;
            setTotalPages(payload.totalPages)
            setPictures(payload.data)
            setCurrentPage(payload.currentPage)
            setOffset(payload.offset)
          })
          .catch(err => console.error(err))
          .finally(() => setLoading(false))
      }
    }
  }, [dispatch, limit]);

  const handleReload = () => {
    callNewPosts(limit, offset + limit);
  };

  return (
    <div className='Photos'>
      {
        (loading && pictures.length === 0 &&
          <>
            <PhotoSkeleton />
            <PhotoSkeleton />
            <PhotoSkeleton />
          </>)
        ||
        (pictures.filter(elem => elem.image).length === 0
          ? <p className='no-users'>no pictures available</p>
          : pictures.map(pic =>
            pic.image && <div key={pic.postId} className="Photos__img">
              <img src={pic.image} alt={`Post N${pic.postId.toString()}`} />
            </div>
          ))
      }
      {loading && pictures.length > 0 && <>
        <PhotoSkeleton />
        <PhotoSkeleton />
        <PhotoSkeleton />
      </>}
      {pictures.length > 0 && (totalPages && currentPage < totalPages) && (
        <Reload func={handleReload} />
      )}
    </div>
  )
}
