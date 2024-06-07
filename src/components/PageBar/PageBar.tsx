import { NavLink, useLocation } from 'react-router-dom'
import ROUTES from '../../routes/routes'
import './PageBar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getJob, getName, getPfp, setPfp } from '../../store/features/userInfo/userInfoSlice'
import { TuserData } from '../../pages/Protected/HomePage/HomePage'

export default function PageBar({ userData }: { userData: TuserData | undefined }) {

  const dispatch = useDispatch();
  const pfp = useSelector(getPfp)
  const job = useSelector(getJob)
  const fname = useSelector(getName)
  const location = useLocation();


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

  const pages = [
    {
      id: 0,
      title: 'Timeline',
      route: ''
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
          <h3>{location.pathname.startsWith('/user') && userData ? userData.fname : fname}</h3>
          <span>{location.pathname.startsWith('/user') && userData ? userData.job : job}</span>
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
