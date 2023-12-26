import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
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

  renderSuccessUserProfile = () => {
    const {userData} = this.state
    console.log(userData)
    return (
      <div>
        <h1>{userData.user_name}</h1>
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
