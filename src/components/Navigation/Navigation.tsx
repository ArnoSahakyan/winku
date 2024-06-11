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
import EditForm from '../EditForm/EditForm';
import IconSearch from '../shared/Icons/IconSearch';
import IconHome from '../shared/Icons/IconHome';

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

      <BurgerMenu menuLinks={dropDownMenu} toggleModal={toggleModal} isOpen={isOpen} />

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
              <IconSearch />
            </a>
            <input className={`${searchOpen ? 'active' : ''} searchFriend`} type="search" name="search" id="search" placeholder='Search Friend' />
          </li>
          <li>
            <Link to={ROUTES.HOME}>
              <IconHome />
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
