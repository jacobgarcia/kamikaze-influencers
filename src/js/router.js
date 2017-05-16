import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Landing from './containers/Landing'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Logout from './containers/Logout'
import Time from './containers/Time'
import Terms from './containers/Terms'
import Usage from './containers/Usage'
import Faqs from './containers/Faqs'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')

  if (token) {
    return true
  }
  return false
}

const requireAuth = (nextState, replace) => {
  if (!isAuthenticated()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={ isAuthenticated() ? Dashboard : Landing }/>
      <Route path='logout' component={Logout}/>
      <Route path='time' component={Time} onEnter={requireAuth}/>
      <Route path='terms' component={Terms}/>
      <Route path='usage' component={Usage}/>
      <Route path='faqs' component={Faqs}/>
    </Route>
  </Router>
)

export default Routes
