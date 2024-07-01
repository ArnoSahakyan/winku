import { useDispatch, useSelector } from 'react-redux'
import { getFriendsBack, getFriendsLoading, getRequests, getUnassociated } from '../../../store/features/friends/friendsSlice'
import { useEffect, useState } from 'react'
import FriendBar from './FriendBar'
import { getRequestsApi, getUnassociatedApi } from '../../../store/features/friends/friendThunks'
import './FriendsPage.scss'
import { AppDispatch } from '../../../store/setup'
import FriendSkeleton from '../../../components/shared/Skeletons/FriendSkeleton'

export default function FriendsPage() {
  const [activePage, setActivePage] = useState('friends')
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector(getFriendsBack);
  const requests = useSelector(getRequests);
  const unassociated = useSelector(getUnassociated);
  const loading = useSelector(getFriendsLoading);

  useEffect(() => {
    dispatch(getRequestsApi())

    if (activePage === 'explore') {
      dispatch(getUnassociatedApi())
    }
  }, [activePage, dispatch, unassociated.length])

  return (
    <div className='FriendsPage'>
      <div className="FriendsPage__select">
        <h4
          className={activePage === 'friends' ? 'active' : ''}
          onClick={() => setActivePage('friends')}>
          My Friends <span>{friends.length}</span>
        </h4>
        <h4
          className={activePage === 'requests' ? 'active' : ''}
          onClick={() => setActivePage('requests')}>
          Friend Requests <span>{requests.length}</span>
        </h4>
        <h4
          className={activePage === 'explore' ? 'active' : ''}
          onClick={() => setActivePage('explore')}>
          Explore People
        </h4>
      </div>
      <div className="FriendsPage__list">
        {activePage === 'friends' && (
          (loading && friends.length === 0 && <>
            <FriendSkeleton />
            <FriendSkeleton />
          </>)
          ||
          (friends.length > 0 ?
            friends.map((friend) => {
              return <FriendBar key={friend.id} data={friend} isFriend={'friend'} />
            })
            : <h4 className='no-users'>No Friends Available</h4>)
        )}
        {
          activePage === 'requests' && (
            (loading && requests.length === 0 && <>
              <FriendSkeleton />
              <FriendSkeleton />
            </>)
            ||
            (requests.length > 0 ?
              requests.map((request) => {
                return <FriendBar key={request.requestId} data={request} isFriend={'request'} />
              })
              : <h4 className='no-users'>No Requests Available</h4>)

          )
        }
        {activePage === 'explore' && (
          (loading && unassociated.length === 0 && <>
            <FriendSkeleton />
            <FriendSkeleton />
          </>)
          ||
          (unassociated.length > 0 ?
            unassociated.map((user) => {
              return <FriendBar key={user.username} data={user} isFriend={'none'} />
            })
            : <h4 className='no-users'>No Users To Explore</h4>)
        )}
      </div>
    </div>
  )
}
