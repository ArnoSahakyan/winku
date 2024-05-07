import { Link } from 'react-router-dom';
import './Navigation.scss'
import ROUTES from '../../routes/routes';

interface MenuItem {
  id: number;
  title: string;
  subtitles: string[];
}

interface MenuIcons {
  id: number;
  title: string;
  icon: JSX.Element;
}

export default function Navigation() {

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
      subtitles: ['404 Error Page', 'About', 'Contact', 'Faqs Page', 'Insights', 'Knowledge Base', 'Widgts']
    },
  ];

  const menuIcons: MenuIcons[] = [
    {
      id: 1,
      title: 'Search',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <title>Search</title>
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
    },
    {
      id: 2,
      title: 'Home',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
        <title>Home</title>
        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
      </svg>
    },
    {
      id: 3,
      title: 'Notifications',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
        <title>Notifications</title>
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
      </svg>
    },
    {
      id: 4,
      title: 'Messages',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
        <title>Messages</title>
        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
      </svg>
    },
    {
      id: 5,
      title: 'Languages',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <title>Languages</title>
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
      </svg>

    }
  ]
  return (
    <div className='Navigation'>
      <div className="Navigation__logo">
        <Link to={ROUTES.NEWSFEED}><img src="/logo.png" /></Link>
      </div>
      <ul className='Navigation__menu'>
        {dropDownMenu.map((menuItem) => (
          <li key={menuItem.id}>
            <a href='#'>{menuItem.title} <span>&#xF282;</span> </a>
            <ul className='submenu'>
              {menuItem.subtitles.map((subtitle, index) => (
                <li key={index}><a href="">{subtitle}</a></li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <ul className='Navigation__icons'>
        {
          menuIcons.map(icon => {
            return <li key={icon.id}><a href="">{icon.icon}</a></li>
          })
        }
      </ul>

      <div className="Navigation__user">
        <div className="user">
          <img src="/logged.jpg" />
        </div>
        <span>&#xF479;</span>
      </div>

    </div>
  )
}
