import './Navigation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { getPfp, getStatus } from '../../store/features/userInfo/userInfoSlice';
import { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { changeOnlineStatus } from '../../store/features/userInfo/userThunks';
import Modal from '../shared/Modal/Modal'
import EditForm from '../EditForm/EditForm';
import IconHome from '../shared/Icons/IconHome';
import SearchUser from '../SearchUser/SearchUser';
import { AppDispatch } from '../../store/setup';

export type MenuItem = {
  id: number;
  title: string;
  subtitles: SubMenu[];
}

type SubMenu = {
  title: string;
  link: string;
}

const onlineStatus: string[] = ['online', 'away', 'offline'];

const dropDownMenu: MenuItem[] = [
  {
    id: 1,
    title: 'Home',
    subtitles: [
      {
        title: 'Home Page',
        link: ROUTES.HOME
      },
      {
        title: 'News Feed',
        link: ROUTES.NEWSFEED
      },
    ]
  },
  {
    id: 2,
    title: 'Timeline',
    subtitles: [
      {
        title: 'Timeline Friends',
        link: '/' + ROUTES.FRIENDS
      },
      {
        title: 'Timeline Photos',
        link: '/' + ROUTES.PHOTOS
      },
      {
        title: 'Message Box',
        link: '/' + ROUTES.MESSAGES
      },
    ]
  },
];

export default function Navigation() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const status = useSelector(getStatus);
  const pfp = useSelector(getPfp);
  const { logout } = useAuth();

  const dispatch = useDispatch<AppDispatch>();

  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
      setStatusOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <Modal toggleModal={toggleModal} isOpen={isOpen}>
          <div className="EditForm">
            <h2>Edit Your Info</h2>
            <EditForm toggleModal={toggleModal} />
          </div>
        </Modal>
      )}

      <BurgerMenu menuLinks={dropDownMenu} />

      <div className='Navigation'>
        <div>
          <div className="Navigation__logo">
            <Link to={ROUTES.NEWSFEED}><img src="/logo.png" alt="Logo" /></Link>
          </div>
          <ul className='Navigation__menu'>
            {dropDownMenu.map((menuItem) => (
              <li key={menuItem.id}>
                <a href=''>{menuItem.title} <span>&#xF282;</span> </a>
                <ul className='submenu'>
                  {menuItem.subtitles.map((subtitle, index) => (
                    <li key={index}><Link to={subtitle.link}>{subtitle.title}</Link></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul className='Navigation__icons'>
            <li>
              <SearchUser />
            </li>
            <li>
              <Link to={ROUTES.HOME}>
                <IconHome />
              </Link>
            </li>
          </ul>

          <div className="Navigation__user" ref={userMenuRef}>
            <div onClick={() => setStatusOpen(!statusOpen)} className={`${status} user`}>
              <img src={pfp} alt="User Profile" />
            </div>
            <ul className={`${statusOpen ? 'open' : ''} actions`}>
              {onlineStatus.map(status => (
                <li className={`${status} status`} onClick={() => dispatch(changeOnlineStatus({ onlineStatus: status }))} key={status}>{status}</li>
              ))}
              <li><Link to={ROUTES.HOME}><span>&#xF4E1;</span> View Profile</Link></li>
              <li><a onClick={toggleModal}><span>&#xF4CB;</span> Edit Profile</a></li>
              <li><a onClick={logout}><span>&#xF4FF;</span> Log Out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
