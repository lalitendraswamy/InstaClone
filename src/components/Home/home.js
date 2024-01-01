import {Component} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header/header'
import Stories from './Stories/stories'
import Posts from './Posts/posts'
import Context from '../../Context/InstaContext'
import './home.css'

const statusCode = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class Home extends Component {
  state = {
    postStatus: statusCode.loading,
    storyStatus: statusCode.loading,
    searchStatus: statusCode.success,
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = async () => {
    await this.getStories()
    await this.getPosts()
  }

  getStories = async () => {
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const stories = data.users_stories

      this.setState({storyStatus: statusCode.success, storiesList: stories})
    } else {
      this.setState({storyStatus: statusCode.failure})
    }
  }

  renderStories = () => {
    const {storyStatus} = this.state
    switch (storyStatus) {
      case statusCode.loading:
        return this.renderLoader()
      case statusCode.success:
        return this.renderSuccessStories()
      case statusCode.failure:
        return this.renderfailure()

      default:
        return null
    }
  }

  renderSuccessStories = () => {
    const {storiesList} = this.state

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
    }

    return (
      <div className="bg">
        <Slider {...settings}>
          {storiesList.map(obj => (
            <Stories key={obj.user_id} userDetails={obj} />
          ))}
        </Slider>
      </div>
    )
  }

  onRetryBtn = () => {
    const {postStatus, searchStatus} = this.state
    if (
      postStatus === statusCode.failure &&
      searchStatus !== statusCode.failure
    ) {
      return this.getPosts()
    }
    if (
      searchStatus === statusCode.failure &&
      postStatus !== statusCode.failure
    ) {
      return this.getStories()
    }
    return this.loadData()
  }

  renderfailure = () => (
    <div className="home-failure-card">
      <img
        alt="failure view"
        src="https://res.cloudinary.com/lalitendra/image/upload/v1703417227/alert-triangle_hdyjx5.png"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.onRetryBtn} type="button" className="lg-btn">
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
    </div>
  )

  getPosts = async () => {
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const {posts} = data
      this.setState({postStatus: statusCode.success, postsList: posts})
    } else {
      this.setState({postStatus: statusCode.failure})
    }
  }

  renderSuccessPosts = () => {
    const {postsList} = this.state

    return (
      <div>
        <ul>
          {postsList.map(obj => (
            <Posts key={obj.post_id} postDetails={obj} />
          ))}
        </ul>
      </div>
    )
  }

  renderPosts = () => {
    const {postStatus} = this.state
    switch (postStatus) {
      case statusCode.loading:
        return this.renderLoader()
      case statusCode.success:
        return this.renderSuccessPosts()
      case statusCode.failure:
        return this.renderfailure()

      default:
        return null
    }
  }

  renderSuccessSearchPosts = value => {
    const {searchList} = value
    const l = searchList.length

    return (
      <div>
        {l > 0 ? (
          <div>
            <h1>Search Results</h1>
            <ul>
              {searchList.map(obj => (
                <Posts key={obj.post_id} postDetails={obj} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="search-nf-card">
            <img
              height="50%"
              alt="search not found"
              src="https://res.cloudinary.com/lalitendra/image/upload/v1704123322/Group_2_yyijgw.png"
            />
            <h1 className="">Search Not Foundt</h1>
            <p>Try different keyword or search again</p>
          </div>
        )}
      </div>
    )
  }

  renderSearchfailure = value => {
    const {onClickSearchBtn} = value

    const onSearchRetry = () => {
      onClickSearchBtn()
    }

    return (
      <div className="home-failure-card">
        <img
          alt="failure view"
          src="https://res.cloudinary.com/lalitendra/image/upload/v1703417227/alert-triangle_hdyjx5.png"
        />
        <p>Something went wrong. Please try again</p>
        <button onClick={onSearchRetry} type="button" className="lg-btn">
          Try again
        </button>
      </div>
    )
  }

  renderSearchPosts = value => {
    const {searchStatus} = value
    switch (searchStatus) {
      case statusCode.loading:
        return this.renderLoader()
      case statusCode.success:
        return this.renderSuccessSearchPosts(value)
      case statusCode.failure:
        return this.renderSearchfailure(value)

      default:
        return null
    }
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {searchText, searchList, searchStatus} = value
          console.log(searchText)
          console.log(searchList)
          console.log(searchStatus)
          return (
            <div>
              <Header />
              {searchText === '' ? (
                <div>
                  <div className="stories-bg">{this.renderStories()}</div>
                  <div className="posts-bg">{this.renderPosts()}</div>
                </div>
              ) : (
                <div>
                  <div className="posts-bg">
                    {this.renderSearchPosts(value)}
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
