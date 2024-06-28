import Title from '../shared/Title/Title'
import './Footer.scss'

export default function Footer() {
  return (
    <footer className='FooterBG'>
      <div className="Footer">
        <div className="Footer__info">
          <img src="/logo.png" alt='winku logo' />
          <p>The trio took this simple idea and built it into the world’s leading carpooling platform.</p>
          <p><span>&#xF47F;</span> 33 new montgomery st.750 san francisco, CA USA 94105.</p>
          <p><span>&#xF4E7;</span>  +1-56-346 345</p>
        </div>

        <ul className='Footer__social Footer-ul'>
          <Title title={<>Follow</>} />
          <li><span>&#xF344;</span> <a>Facebook</a></li>
          <li><span>&#xF5EF;</span> <a>Twitter</a></li>
          <li><span>&#xF437;</span> <a>Instagram</a></li>
          <li><span>&#xF3F0;</span> <a>Google+</a></li>
          <li><span>&#xF663;</span> <a>Pinterest</a></li>
        </ul>

        <ul className='Footer__navigate Footer-ul'>
          <Title title={<>Navigate</>} />
          <li><a>About Us</a></li>
          <li><a>Contact Us</a></li>
          <li><a>Terms & Conditions</a> </li>
          <li><a>RSS Syndication</a></li>
          <li><a>Sitemap</a></li>
        </ul>

        <ul className='Footer__links Footer-ul'>
          <Title title={<>Useful Links</>} />
          <li><a>Leasing</a></li>
          <li><a>Submit Route</a></li>
          <li><a>How Does It Work?</a> </li>
          <li><a>Agent Listings</a></li>
          <li><a>View All</a></li>
        </ul>

        <ul className='Footer__apps Footer-ul'>
          <Title title={<>Download Apps</>} />
          <li><span>&#xF7D1;</span> Android</li>
          <li><span>&#xF65B;</span> Apple</li>
          <li><span>&#xF65E;</span> Windows</li>
        </ul>
      </div>
      <div className="FooterBottom">
        <p>© Winku 2024. All rights reserved.</p>
        <div className="cards">
          <img src="/cards.png" alt='card companies' />
        </div>
      </div>

    </footer>
  )
}
