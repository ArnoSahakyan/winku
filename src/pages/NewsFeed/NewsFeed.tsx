import Feed from '../../components/Feed/Feed'
import Footer from '../../components/Footer/Footer'
import FriendsBar from '../../components/FriendsBar/FriendsBar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Navigation from '../../components/Navigation/Navigation'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import Shortcuts from '../../components/Shortcuts/Shortcuts'
import './NewsFeed.scss'

export default function NewsFeed() {
  return (
    <div className='NewsFeed'>
      <Navigation />
      <LeftSidebar />
      <RightSidebar />
      <section>
        <Shortcuts />
        <Feed />
        <FriendsBar />
      </section>
      <Footer />
    </div>
  )
}
