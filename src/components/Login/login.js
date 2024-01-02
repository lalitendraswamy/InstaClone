import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import './login.css'

class Login extends Component {
  state = {showErr: false, errMsg: '', username: '', password: ''}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showErr: true, errMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const objDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(objDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errMsg, showErr} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(errMsg)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <img
          alt="website login"
          src="https://res.cloudinary.com/lalitendra/image/upload/v1702810949/gqxnjaggrkhbdsfv9ftr.png"
        />
        <form onSubmit={this.submitForm} className="login-form">
          <img
            alt="website logo"
            src="https://res.cloudinary.com/lalitendra/image/upload/v1702811251/logo_bdpwgo.png"
          />
          <h1>Insta Share</h1>
          <div>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              onChange={this.onUsername}
              placeholder="Enter Username"
              id="username"
              type="text"
            />
          </div>

          <div>
            <label htmlFor="password">PASSWORD</label>
            <br />

            <input
              onChange={this.onPassword}
              placeholder="Enter Password"
              id="password"
              type="password"
            />
            <br />
            {showErr && <p className="login-error">{errMsg}</p>}
          </div>
          <input className="login-btn" type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default Login
