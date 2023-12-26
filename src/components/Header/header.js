import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './header.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props

    history.replace('/')
  }

  return (
    <nav>
      <div className="flex-card1">
        <button type="button" onClick={onClickLogo}>
          <img
            alt="website logo"
            src="https://res.cloudinary.com/lalitendra/image/upload/v1702811251/logo_bdpwgo.png"
          />
        </button>
        <h1>Insta Share</h1>
      </div>

      <div className="flex-card">
        <div className="search-card">
          <input
            className="search-input"
            placeholder="Search"
            id="search"
            type="search"
          />
          <button
            className="search-btn"
            aria-label="Control Label"
            type="button"
            data-testid="searchIcon"
          >
            <FaSearch />
          </button>
        </div>
        <ul className="nav-list">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/my-profile">
              Profile
            </Link>
          </li>
          <li>
            <button onClick={onClickLogout} className="lg-btn" type="button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
