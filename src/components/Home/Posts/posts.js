import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './posts.css'

class Posts extends Component {
  state = {likeStatus: false, count: 0}

  componentDidMount() {
    const {postDetails} = this.props
    this.setState({count: postDetails.likes_count})
  }

  onClickUnlike = async () => {
    const {postDetails} = this.props
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/insta-share/posts/${postDetails.post_id}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify({like_status: true}),
    }

    const response = await fetch(url, options)
    if (response.ok) {
      this.setState(prevState => ({
        count: prevState.count + 1,
        likeStatus: true,
      }))
    }
  }

  onClickLike = async () => {
    const {postDetails} = this.props
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/insta-share/posts/${postDetails.post_id}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify({like_status: false}),
    }

    const response = await fetch(url, options)
    if (response.ok) {
      this.setState(prevState => ({
        count: prevState.count - 1,
        likeStatus: false,
      }))
    }
  }

  render() {
    const {postDetails} = this.props
    const {likeStatus, count} = this.state

    return (
      <li className="post-card">
        <div className="post-top">
          <img
            className="dp"
            alt="post author profile"
            src={postDetails.profile_pic}
          />

          <Link className="nav-link" to={`/users/${postDetails.user_id}`}>
            {postDetails.user_name}
          </Link>
        </div>

        <img
          height={500}
          width="100%"
          src={postDetails.post_details.image_url}
          alt="post"
        />

        <div className="post-bottom">
          <div className="icon-card>">
            {likeStatus ? (
              <button
                className="post-icon"
                type="button"
                aria-label="like"
                testid="unLikeIcon"
                onClick={this.onClickLike}
              >
                <FcLike />
              </button>
            ) : (
              <button
                className="post-icon"
                type="button"
                aria-label="like"
                testid="likeIcon"
                onClick={this.onClickUnlike}
              >
                <BsHeart />
              </button>
            )}

            <button
              className="post-icon"
              type="button"
              aria-label="like"
              testid="unLikeIcon"
            >
              <FaRegComment />
            </button>
            <button
              className="post-icon"
              type="button"
              aria-label="like"
              testid="unLikeIcon"
            >
              <BiShareAlt />
            </button>
          </div>

          <p>
            <b>{count} likes</b>
          </p>
          <p>{postDetails.post_details.caption}</p>

          <ul>
            {postDetails.comments.map(obj => (
              <li key={obj.user_id}>
                <b>{obj.user_name}</b> {obj.comment}
              </li>
            ))}
          </ul>
          <p>{postDetails.created_at}</p>
        </div>
      </li>
    )
  }
}

export default Posts
