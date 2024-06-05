import './Navigation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { getPfp, getStatus } from '../../store/features/userInfo/userInfoSlice';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { changeOnlineStatus } from '../../store/features/userInfo/userThunks';
import Modal from '../shared/Modal/Modal'
import { Formik } from 'formik';
import EditForm from '../EditForm/EditForm';

export type MenuItem = {
  id: number;
  title: string;
  subtitles: string[];
}

const onlineStatus = ['online', 'away', 'offline'];

const dropDownMenu: MenuItem[] = [
  {
    id: 1,
    title: 'Home',
    subtitles: ['Home Social', 'Home Social 2', 'Home Company', 'Login Page', 'Logout Page', 'News Feed']
  },
  {
    id: 2,
    title: 'Timeline',
    subtitles: ['Timeline Friends', 'Timeline Groups', 'Timeline Pages', 'Timeline Photos', 'Timeline Videos', 'Post Single', 'Favourite Page', 'Groups Page', 'Likes Page', 'People Nearby']
  },
  {
    id: 3,
    title: 'Account Settings',
    subtitles: ['Create Fav Page', 'Edit Account Settings', 'Edit-Interest', 'Edit-Password', 'Edit Profile Basics', 'Edit Work Educations', 'Message Box', 'Inbox', 'Notifications Page']
  },
  {
    id: 4,
    title: 'More Pages',
    subtitles: ['404 Error Page', 'About', 'Contact', 'Faqs Page', 'Insights', 'Knowledge Base', 'Widgets']
  },
];

export default function Navigation() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const status = useSelector(getStatus);
  const pfp = useSelector(getPfp);
  const { logout } = useAuth();

  const dispatch = useDispatch();

  return (
    <>

      {isOpen
        ? <Modal toggleModal={toggleModal} isOpen={isOpen}>
          <div className="EditForm">
            <h2>Edit Your Info</h2>
            <EditForm toggleModal={toggleModal} />
          </div>
        </Modal>
        : null
      }

      <BurgerMenu menuLinks={dropDownMenu} />

      <div className='Navigation'>
        <div className="Navigation__logo">
          <Link to={ROUTES.NEWSFEED}><img src="/logo.png" alt="Logo" /></Link>
        </div>
        <ul className='Navigation__menu'>
          {dropDownMenu.map((menuItem) => (
            <li key={menuItem.id}>
              <a href=''>{menuItem.title} <span>&#xF282;</span> </a>
              <ul className='submenu'>
                {menuItem.subtitles.map((subtitle, index) => (
                  <li key={index}><a href="">{subtitle}</a></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <ul className='Navigation__icons'>
          <li>
            <a onClick={() => setSearchOpen(!searchOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <title>Search</title>
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </a>
            <input className={`${searchOpen ? 'active' : ''} searchFriend`} type="search" name="search" id="search" placeholder='Search Friend' />
          </li>
          <li>
            <Link to={ROUTES.HOME}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                <title>Home</title>
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
              </svg>
            </Link>
          </li>
        </ul>

        <div className="Navigation__user">
          <div onClick={() => setStatusOpen(!statusOpen)} className={`${status} user`}>
            <img src={pfp} alt="User Profile" />
          </div>
          <span>&#xF479;</span>

          <ul className={`${statusOpen ? 'open' : ''} actions`}>
            {
              onlineStatus.map(status => (
                <li className={`${status} status`} onClick={() => dispatch(changeOnlineStatus(status))} key={status}>{status}</li>
              ))
            }
            <li><Link to={ROUTES.HOME}><span>&#xF4E1;</span> View Profile</Link></li>
            <li><a onClick={() => toggleModal()} ><span>&#xF4CB;</span> Edit Profile</a></li>
            <li><a onClick={() => logout()}><span>&#xF4FF;</span> Log Out</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
