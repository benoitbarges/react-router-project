import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Players from './Players'
import Teams from './Teams'
import TeamPage from './TeamPage'
import Navbar from './Navbar'
import Articles from './Articles'

function FourOfour() {
  return <h1 className='text-center'>404 Not Found</h1>
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/players' component={Players} />
            <Route path='/teams' component={Teams} />
            <Route path='/:teamId/articles' component={Articles} />
            <Route exact path='/:teamId' component={TeamPage} />
            <Route component={FourOfour} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
