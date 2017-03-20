import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Landing from './containers/Landing'

const Routes = (
  <Router>
    <Route exact path='/' component={Landing}/>
  </Router>
)

export default Routes
