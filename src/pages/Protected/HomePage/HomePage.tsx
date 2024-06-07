import { Outlet, useParams } from 'react-router-dom'
import PageBar from '../../../components/PageBar/PageBar'
import ProfileCover from '../../../components/ProfileCover/ProfileCover'
import Shortcuts from '../../../components/Shortcuts/Shortcuts'
import './HomePage.scss'
import FriendsBar from '../../../components/FriendsBar/FriendsBar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataById } from '../../../store/features/userInfo/userThunks'
import { getUserID } from '../../../store/features/userInfo/userInfoSlice'

export type TuserData = {
  coverPhoto: string,
  email: string,
  fname: string,
  id: number,
  job: string,
  onlineStatus: string,
  pfp: string,
  username: string
}

export default function HomePage() {
  const [userData, setUserData] = useState<TuserData | undefined>(undefined);
  const userId = useSelector(getUserID)

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id == userId) { return }
    else if (id) {
      dispatch(getUserDataById(id))
        .then(res => res.payload ? setUserData(res.payload) : null)
    }
  }, [dispatch, id, userId])

  return (
    <>
      <div className='HomePage'>
        <ProfileCover userData={userData} id={id} />
        <PageBar userData={userData} id={id} />
        <section>
          <Shortcuts />
          <Outlet />
          <FriendsBar />
        </section>
      </div>
    </>
  )
}
