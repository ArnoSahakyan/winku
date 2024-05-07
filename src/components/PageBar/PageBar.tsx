import { NavLink } from 'react-router-dom'
import ROUTES from '../../routes/routes'
import './PageBar.scss'

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

  return (
    <div className='PageBar'>
      <div className="PageBar__user">
        <div className="pfp">
          <img src="/pfp.jpg" />
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
