import { useEffect, useState } from 'react'
import './Photos.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPhotos } from '../../../store/features/post/postThunks';
import { getUserID } from '../../../store/features/userInfo/userInfoSlice';

type Timages = {
  postId: number;
  image: string
}

export default function Photos() {
  const dispatch = useDispatch();
  const id = useSelector(getUserID)
  const [pictures, setPictures] = useState<Timages[]>([])

  useEffect(() => {
    dispatch(getUserPhotos(id))
      .then(res => setPictures(res.payload))
  }, [dispatch, id]);

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
