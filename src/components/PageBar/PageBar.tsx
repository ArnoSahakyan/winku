import { NavLink } from 'react-router-dom'
import ROUTES from '../../routes/routes'
import './PageBar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getName, getPfp, setPfp } from '../../store/features/userInfo/userInfoSlice'

export default function PageBar() {

  const dispatch = useDispatch();
  const pfp = useSelector(getPfp)

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(setPfp(reader.result as string));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
            onChange={handleProfileImageChange}
            style={{ display: 'none' }} // Hide the input element
          />
        </div>
        <div className="name">
          <h3>{fname}</h3>
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
