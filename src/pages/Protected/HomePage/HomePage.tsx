import { Outlet } from 'react-router-dom'
import PageBar from '../../../components/PageBar/PageBar'
import ProfileCover from '../../../components/ProfileCover/ProfileCover'
import Shortcuts from '../../../components/Shortcuts/Shortcuts'
import './HomePage.scss'
import FriendsBar from '../../../components/FriendsBar/FriendsBar'
import { useSelector } from 'react-redux'
import { getUserError } from '../../../store/features/userInfo/userInfoSlice'
import { useEffect } from 'react'
import { notifyError } from '../../../hooks/useAuth'
import { postError } from '../../../store/features/post/postSlice'

export default function HomePage() {
  const error = useSelector(getUserError)
  const postErrors = useSelector(postError)
  useEffect(() => {
    error && notifyError(error)
    postError && notifyError(postErrors)
  }, [error, postErrors])

  return (
    <>
      <div className='HomePage'>
        <ProfileCover />
        <PageBar />
        <section>
          <Shortcuts />
          <Outlet />
          <FriendsBar />
        </section>
      </div>
    </>
  )
}
