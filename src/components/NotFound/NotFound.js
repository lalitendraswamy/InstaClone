import {Link} from 'react-router-dom'
import './notFound.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      alt="page not found"
      src="https://res.cloudinary.com/lalitendra/image/upload/v1702832735/erroring_1_avyr0b.png"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="nf-btn" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
