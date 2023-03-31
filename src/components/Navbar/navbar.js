import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FaBars, FaMoon} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import './navbar.css'

const Navbar = props => {
  const onClickToLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
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
          <button type="button" className="nav-links" onClick={onClickToLogout}>
            <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)
