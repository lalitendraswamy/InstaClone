import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login/login'
import Home from './components/Home/home'
import NotFound from './components/NotFound/NotFound'
import MyProfile from './components/MyProfile/MyProfile'
import ProtectedRoute from './components/ProtectedRoute/protect'
import UserProfile from './components/UserProfile/UserProfile'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
