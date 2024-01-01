import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from './components/Login/login'
import Home from './components/Home/home'
import NotFound from './components/NotFound/NotFound'
import MyProfile from './components/MyProfile/MyProfile'
import ProtectedRoute from './components/ProtectedRoute/protect'
import UserProfile from './components/UserProfile/UserProfile'
import Context from './Context/InstaContext'
import './App.css'

const statusCode = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class App extends Component {
  state = {
    searchText: '',
    searchList: [],
    searchStatus: statusCode.loading,
    searchBtnClick: false,
  }

  onClickSearchBtn = async text => {
    this.setState({searchStatus: statusCode.loading})
    const url = `https://apis.ccbp.in/insta-share/posts?search=${text}`
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
      const searchRes = data.posts
      this.setState({
        searchStatus: statusCode.success,
        searchList: searchRes,
        searchBtnClick: false,
        searchText: text,
      })
    } else {
      this.setState({searchStatus: statusCode.failure})
    }
  }

  updateSearchText = () => {
    this.setState({searchText: ''})
  }

  render() {
    const {
      searchText,
      searchStatus,
      searchBtnClick,

      searchList,
    } = this.state
    return (
      <Context.Provider
        value={{
          searchText,
          searchBtnClick,
          searchStatus,
          onClickSearchBtn: this.onClickSearchBtn,
          searchList,
          updateSearchText: this.updateSearchText,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
