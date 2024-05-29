import Feed from '../../../components/Feed/Feed'
import FriendsBar from '../../../components/FriendsBar/FriendsBar'
import LeftSidebar from '../../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../../components/RightSidebar/RightSidebar'
import Shortcuts from '../../../components/Shortcuts/Shortcuts'
import './NewsFeed.scss'

export default function NewsFeed() {
  return (
    <div className='NewsFeed'>
      <LeftSidebar />
      <RightSidebar />
      <section>
        <Shortcuts />
        <Feed />
        <FriendsBar />
      </section>
    </div>
  )
}
