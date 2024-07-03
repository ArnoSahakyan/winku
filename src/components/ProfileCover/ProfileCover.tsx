import './ProfileCover.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCoverPhoto, getLoading, getPfp } from '../../store/features/userInfo/userInfoSlice';
import { changeUserImage } from '../../store/features/userInfo/userThunks';
import { AppDispatch } from '../../store/setup';
import SecondaryLoader from '../shared/SecondaryLoader/SecondaryLoader';

export default function ProfileCover() {
  const dispatch = useDispatch<AppDispatch>();
  const pfp = useSelector(getPfp);
  const coverImage = useSelector(getCoverPhoto);
  const uploadLoading = useSelector(getLoading)

  const handlePfp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    dispatch(changeUserImage({ file, type: "pfp" }))
  }

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    dispatch(changeUserImage({ file, type: "coverPhoto" }))
  }

  return (
    <div className='ProfileCoverBG'>
      {
        uploadLoading.loading && uploadLoading.type === 'coverPhoto'
          ? <div className='coverBG upload-loader'><SecondaryLoader /> </div>
          : <img className='coverBG' src={coverImage} alt='Cover Photo' />
      }
      <div className="ProfileCover">
        <div className="ProfileCover__left">
          <div className="pfp">
            {
              uploadLoading.loading && uploadLoading.type === 'pfp'
                ? <div className='upload-loader'><SecondaryLoader /> </div>
                : <img src={pfp} alt='profile picture' />
            }
            <label htmlFor="upload-pfp" className='editpfp'>Edit Display Photo</label>
            <input
              id="upload-pfp"
              type="file"
              accept="image/*"
              onChange={handlePfp}
              style={{ display: 'none' }}
            />
          </div>
          <label htmlFor="upload" className='editphoto'>Edit Cover Photo</label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleCover}
            style={{ display: 'none' }}
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
