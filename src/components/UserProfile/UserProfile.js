import {Component} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Stories from './Stories/stories'
import Header from '../Header/header'
import './UserProfile.css'

const statusCode = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class UserProfile extends Component {
  state = {userStatus: statusCode.loading, userData: {}}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({userStatus: statusCode.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        userData: data.user_details,
        userStatus: statusCode.success,
      })
    } else {
      this.setState({userStatus: statusCode.failure})
    }
  }

  onRetry = () => {
    this.getUserProfile()
  }

  renderfailure = () => (
    <div className="up-loader-container">
      <img
        height="50%"
        alt="failure view"
        src="https://res.cloudinary.com/lalitendra/image/upload/v1702833753/Group_7522_rf182w.png"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.onRetry} type="button" className="lg-btn">
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="up-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
    </div>
  )

  renderSuccessStories = () => {
    const {userData} = this.state
    const storiesList = userData.stories

    const SampleNextArrow = props => {
      const {className, style, onClick} = props
      return (
        <div
          className={className}
          style={{
            ...style,
            display: 'block',
            background: '#334155',
            borderRadius: '16px',
            color: 'black',
          }}
          onClick={onClick}
          aria-label="Control Label1"
          role="button" // Add role="button" to indicate it's a button-like element
          tabIndex={0} // Add tabindex to make it focusable and interactive
        />
      )
    }

    const SamplePrevArrow = props => {
      const {className, style, onClick} = props
      return (
        <div
          className={className}
          style={{
            ...style,
            display: 'block',
            backgroundColor: '#E5E5E5',
            borderRadius: '16px',
          }}
          onClick={onClick}
          role="button"
          aria-label="Control Label"
          tabIndex={0}
        />
      )
    }

    const settings = {
      dots: false,

      slidesToShow: 7,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      adaptiveHeight: true,
    }

    return (
      <div className="up-story-bg">
        <Slider {...settings}>
          {storiesList.map(obj => (
            <Stories key={obj.id} upStoryDetails={obj} />
          ))}
        </Slider>
      </div>
    )
  }

  renderSuccessUserProfile = () => {
    const {userData} = this.state
    console.log(userData)
    return (
      <div>
        <div className="up-pic-card">
          <img
            alt="user profile"
            className="up-pic"
            src={userData.profile_pic}
          />
          <div>
            <h1 className="user-name">{userData.user_name}</h1>
            <div className="followers-card">
              <div>{userData.posts_count} posts</div>
              <div>{userData.followers_count} followers</div>
              <div>{userData.following_count} following</div>
            </div>
            <p>
              <b>{userData.user_id}</b>
            </p>
            <p>{userData.user_bio}</p>
          </div>
        </div>
        {this.renderSuccessStories()}
      </div>
    )
  }

  renderUserProfile = () => {
    const {userStatus} = this.state
    switch (userStatus) {
      case statusCode.loading:
        return this.renderLoader()
      case statusCode.success:
        return this.renderSuccessUserProfile()
      case statusCode.failure:
        return this.renderfailure()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <Header />
          <div className="up-bg">{this.renderUserProfile()}</div>
        </div>
      </div>
    )
  }
}

export default UserProfile
