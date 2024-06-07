import './ProfileCover.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCoverPhoto, getPfp, getUserID } from '../../store/features/userInfo/userInfoSlice';
import { changeCover, changePfp } from '../../store/features/userInfo/userThunks';
import { AppDispatch } from '../../store/setup';
import { useLocation } from 'react-router-dom';
import { TuserData } from '../../pages/Protected/HomePage/HomePage'
export default function ProfileCover({ userData, id }: { userData: TuserData | undefined, id: number | undefined }) {
  const dispatch = useDispatch<AppDispatch>();
  const pfp = useSelector(getPfp)
  const userID = useSelector(getUserID)
  const coverImage = useSelector(getCoverPhoto)
  const location = useLocation();

  const handlePfp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const values = {
      userID,
      file
    }
    dispatch(changePfp(values))
  }

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const values = {
      userID,
      file
    }
    dispatch(changeCover(values))
  }
  console.log("AAAAAAAAAAa", userData);

  return (
    <div className='ProfileCoverBG'>
      <img className='coverBG' src={userData && location.pathname.startsWith('/user') ? userData.coverPhoto : coverImage} alt='Cover Image' />
      <div className="ProfileCover">
        <div className="ProfileCover__left">
          <div className="pfp">
            <img src={userData && location.pathname.startsWith('/user') ? userData.pfp : pfp} alt='profile picture' />
            {
              (id != userID && location.pathname.startsWith('/user')) ? null :
                <label htmlFor="upload-pfp" className='editpfp'>Edit Display Photo</label>
            }
            <input
              id="upload-pfp"
              type="file"
              accept="image/*"
              onChange={handlePfp}
              style={{ display: 'none' }} // Hide the input element
            />
          </div>
          {
            (id != userID && location.pathname.startsWith('/user')) ? null
              : <label htmlFor="upload" className='editphoto'>Edit Cover Photo</label>
          }
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleCover}
            style={{ display: 'none' }} // Hide the input element
          />
        </div>

        <div className="ProfileCover__right">
          <p>1205 followers</p>
          <button className='addfriend'>Add Friend</button>
        </div>
      </div>
    </div>
  )
}
