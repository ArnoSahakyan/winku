import './ProfileCover.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCoverPhoto, getPfp, getUserID } from '../../store/features/userInfo/userInfoSlice';
import { changeCover, changePfp } from '../../store/features/userInfo/userThunks';
import { AppDispatch } from '../../store/setup';

export default function ProfileCover() {
  const dispatch = useDispatch<AppDispatch>();
  const pfp = useSelector(getPfp)
  const userID = useSelector(getUserID)
  const coverImage = useSelector(getCoverPhoto)

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

  return (
    <div className='ProfileCoverBG'>
      <img className='coverBG' src={`${coverImage}`} alt='Cover Image' />
      <div className="ProfileCover">
        <div className="ProfileCover__left">
          <div className="pfp">
            <img src={`${pfp}`} alt='profile picture' />
            <label htmlFor="upload-pfp" className='editpfp'>Edit Display Photo</label>
            <input
              id="upload-pfp"
              type="file"
              accept="image/*"
              onChange={handlePfp}
              style={{ display: 'none' }} // Hide the input element
            />
          </div>
          <label htmlFor="upload" className='editphoto'>Edit Cover Photo</label>
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
