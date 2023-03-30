import {Link} from 'react-router-dom'

import {FaBars, FaMoon} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import './navbar.css'

const Navbar = () => (
  <nav className="nav-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
      alt=""
      className="nav-image"
    />
    <ul className="nav-elements">
      <li>
        <button type="button" className="nav-links">
          <FaMoon />
        </button>
      </li>
      <li>
        <button type="button" className="nav-links">
          <FaBars />
        </button>
      </li>
      <li>
        <button type="button" className="nav-links">
          <FiLogOut />
        </button>
      </li>
    </ul>
  </nav>
)

export default Navbar
