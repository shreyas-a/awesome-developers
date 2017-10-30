import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import App from './App.jsx'
import Developers from './Developers.jsx'

const Routes = () => (
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/map' component={Developers} />
    </div>
  </Router>
  )
export default Routes
