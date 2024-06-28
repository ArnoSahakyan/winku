import { NavLink } from 'react-router-dom'
import ROUTES from '../../routes/routes'
import './PageBar.scss'
import { useSelector } from 'react-redux'
import { getJob, getName, getPfp, } from '../../store/features/userInfo/userInfoSlice'

export default function PageBar() {

  const pfp = useSelector(getPfp)
  const job = useSelector(getJob)

  const fname = useSelector(getName)

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
          <img src={pfp} alt='profile picture' />
          <label htmlFor="upload-pfp" className='editpfp'>Edit Display Photo</label>
          <input
            id="upload-pfp"
            type="file"
            accept="image/*"
            style={{ display: 'none' }} // Hide the input element
          />
        </div>
        <div className="name">
          <h3>{fname}</h3>
          <span>{job}</span>
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
