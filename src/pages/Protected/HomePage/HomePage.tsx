import { Outlet } from 'react-router-dom'
import PageBar from '../../../components/PageBar/PageBar'
import ProfileCover from '../../../components/ProfileCover/ProfileCover'
import Shortcuts from '../../../components/Shortcuts/Shortcuts'
import './HomePage.scss'
import FriendsBar from '../../../components/FriendsBar/FriendsBar'

export default function HomePage() {

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
