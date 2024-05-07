import { useEffect, useState } from 'react'
import './Photos.scss'
import axios from 'axios'

interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
  };
  slug: string;
  // Add more properties if needed
}

export default function Photos() {

  const [pictures, setPictures] = useState<UnsplashPhoto[]>([])

  useEffect(() => {
    axios.get('https://api.unsplash.com/photos?page=1&client_id=tz9G4oRnN-QAEYqOoS-D4ucLXOj5ZoV29prxgTs7C5c')
      .then(res => setPictures(res.data))
  }, []);

  return (
    <div className='Photos'>

      {
        pictures.map(pic => {
          return <div key={pic.id} className="Photos__img">
            <img src={pic.urls.regular} alt={pic.slug} />
          </div>
        })
      }
    </div>
  )
}
