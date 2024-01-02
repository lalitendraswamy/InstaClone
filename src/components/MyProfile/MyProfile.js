import {Component} from 'react'
import Slider from 'react-slick'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import UserPost from '../UserProfile/UserPost/UserPost'
import Header from '../Header/header'
import Stories from '../UserProfile/Stories/stories'
import './MyProfile.css'

const statusCode = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class MyProfile extends Component {
  state = {userStatus: statusCode.loading, profileData: {}}

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({userStatus: statusCode.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
        profileData: data.profile,
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
    const {profileData} = this.state
    const storiesList = profileData.stories

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
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
    const {profileData} = this.state
    const {posts} = profileData
    const l = posts.length
    console.log(profileData)
    return (
      <div>
        <div className="up-pic-card">
          <img
            alt="user profile"
            className="up-pic"
            src={profileData.profile_pic}
          />
          <div>
            <h1 className="user-name">{profileData.user_name}</h1>
            <div className="followers-card">
              <div>{profileData.posts_count} posts</div>
              <div>{profileData.followers_count} followers</div>
              <div>{profileData.following_count} following</div>
            </div>
            <p>
              <b>{profileData.user_id}</b>
            </p>
            <p>{profileData.user_bio}</p>
          </div>
        </div>
        {this.renderSuccessStories()}
        <hr />
        <div>
          <div className="flex">
            <BsGrid3X3 className="grid-icon" />
            <h2>Posts</h2>
          </div>
          <div>
            {l > 0 ? (
              <ul className="up-list">
                {posts.map(obj => (
                  <UserPost key={obj.id} obj={obj} />
                ))}
              </ul>
            ) : (
              <div className="no-posts-card">
                <BiCamera className="cam-icon" />
                <h1 className="user-name">No Posts Yet</h1>
              </div>
            )}
          </div>
        </div>
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

export default MyProfile
