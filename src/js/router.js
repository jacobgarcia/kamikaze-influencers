import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Landing from './containers/Landing'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Profile from './containers/Profile'
import Authenticate from './containers/Authenticate'
import Logout from './containers/Logout'
import TimeRemaining from './containers/TimeRemaining'

const isAuthenticated = () => {
  const token = window.localStorage.getItem('token')
  console.log('isAuthenticated? token', token)
  if (token) {
    return true
  }
  return false
}

const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={ isAuthenticated() ? Dashboard : Landing }/>
      <Route path='profile' component={Profile}/>
      <Route path='authenticate' component={Authenticate}/>
      <Route path='logout' component={Logout}/>
      <Route path='time' component={TimeRemaining}/>
    </Route>

  </Router>
)

export default Routes
