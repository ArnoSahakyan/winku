import { Outlet } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import PageBar from '../../components/PageBar/PageBar'
import ProfileCover from '../../components/ProfileCover/ProfileCover'
import Shortcuts from '../../components/Shortcuts/Shortcuts'
import './HomePage.scss'
import FriendsBar from '../../components/FriendsBar/FriendsBar'
import Footer from '../../components/Footer/Footer'

export default function HomePage() {

  return (
    <>
      <Navigation />
      <div className='HomePage'>
        <ProfileCover />
        <PageBar />
        <section>
          <Shortcuts />
          <Outlet />
          <FriendsBar />
        </section>
        <Footer />
      </div>
    </>
  )
}
