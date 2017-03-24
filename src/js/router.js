import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Landing from './containers/Landing'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Profile from './containers/Profile'
import Authenticate from './containers/Authenticate'

const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Landing}/>
      <Route path='dashboard' component={Dashboard}/>
      <Route path='authenticate' component={Authenticate}/>
    </Route>

  </Router>
)

export default Routes
