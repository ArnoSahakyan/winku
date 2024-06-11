import { useEffect, useState } from "react";
import './BurgerMenu.scss'
import ROUTES from "../../routes/routes";
import { Link } from "react-router-dom";
import { MenuItem } from '../Navigation/Navigation'


export default function BurgerMenu({ menuLinks }: { menuLinks: MenuItem[] }) {

  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
  const [menu_class, setMenuClass] = useState("menu hidden")
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null)

  const handleSubmenu = (id) => {
    if (openSubmenu === id) setOpenSubmenu(null)
    else setOpenSubmenu(id)
  }

  // toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked")
      setMenuClass("menu visible")
    }
    else {
      setBurgerClass("burger-bar unclicked")
      setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const menu = document.querySelector('.menu');
      const menuIcon = document.querySelector('.burger-menu');
      const burgerBars = document.querySelectorAll('.burger-bar');


      if (
        !menu!.contains(e.target as Node) &&
        isMenuClicked &&
        e.target !== menuIcon &&
        !Array.from(burgerBars).some(bar => bar.contains(e.target as Node))
      ) {
        updateMenu();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isMenuClicked]);


  return (
    <div className="BurgerMenu">
      <nav>
        <Link to={ROUTES.NEWSFEED}>
          <img src="/logo2.png" alt="winku-logo" />
        </Link>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class} ></div>
          <div className={burger_class} ></div>
          <div className={burger_class} ></div>
        </div>
      </nav>

      <div className={menu_class}>
        <h2>Menu</h2>
        <ul className="bLinks">
          {
            menuLinks.map(link => {
              return <li key={link.id} onClick={() => handleSubmenu(link.id)}>
                <span>{link.title}</span>
                <ul className={`${link.id === openSubmenu ? 'active' : 'not-active'} bSublinks`}>
                  {
                    link.subtitles.map((sub, index) => {
                      return <li key={index}>{sub}</li>
                    })
                  }
                </ul>
              </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
