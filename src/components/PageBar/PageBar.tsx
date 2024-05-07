import { NavLink } from 'react-router-dom'
import ROUTES from '../../routes/routes'
import './PageBar.scss'
import { useSelector } from 'react-redux'
import { getPfp } from '../../store/features/userInfoSlice'

export default function PageBar() {

  const pages = [
    {
      id: 0,
      title: 'Timeline',
      route: ROUTES.HOME
    },
    {
      id: 1,
      title: 'Photos',
      route: ROUTES.PHOTOS
    },
    {
      id: 2,
      title: 'Friends',
      route: ROUTES.FRIENDS
    },
  ]

  const pfp = useSelector(getPfp)

  return (
    <div className='PageBar'>
      <div className="PageBar__user">
        <div className="pfp">
          <img src={pfp} />
        </div>
        <div className="name">
          <h3>Janice Griffith</h3>
          <span>Group Admin</span>
        </div>
      </div>
      <div className="PageBar__menu">
        {
          pages.map(page => {
            return <NavLink key={page.id} to={page.route}>{page.title}</NavLink>
          })
        }
      </div>
    </div>
  )
}
