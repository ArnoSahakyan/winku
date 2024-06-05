import { useEffect, useState } from 'react'
import './Photos.scss'
import { useDispatch } from 'react-redux';
import { getUserPhotos } from '../../../store/features/post/postThunks';

type Timages = {
  postId: number;
  image: string
}

export default function Photos() {
  const dispatch = useDispatch()
  const [pictures, setPictures] = useState<Timages[]>([])

  useEffect(() => {
    dispatch(getUserPhotos())
      .then(res => setPictures(res.payload))
  }, [dispatch]);

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
