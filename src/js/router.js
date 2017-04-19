import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Landing from './containers/Landing'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Profile from './containers/Profile'
import Logout from './containers/Logout'
import Time from './containers/Time'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')

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
      <Route path='logout' component={Logout}/>
      <Route path='time' component={Time}/>
    </Route>

  </Router>
)

export default Routes
