import './ProfileCover.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCoverPhoto, getPfp, setCoverPhoto, setPfp } from '../../store/features/userInfoSlice';

export default function ProfileCover() {
  const dispatch = useDispatch();
  const profileImage = useSelector(getPfp)
  const coverImage = useSelector(getCoverPhoto)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(setCoverPhoto(reader.result as string));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <div className='ProfileCoverBG'>
      <img className='coverBG' src={coverImage} />
      <div className="ProfileCover">
        <div className="ProfileCover__left">
          <div className="pfp">
            <img src={profileImage} />
            <label htmlFor="upload-pfp" className='editpfp'>Edit Display Photo</label>
            <input
              id="upload-pfp"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: 'none' }} // Hide the input element
            />
          </div>
          <label htmlFor="upload" className='editphoto'>Edit Cover Photo</label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
