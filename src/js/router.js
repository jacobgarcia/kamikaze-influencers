import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Landing from './containers/Landing'
import App from './containers/App'

const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={ Landing }/>
    </Route>

  </Router>
)

export default Routes
