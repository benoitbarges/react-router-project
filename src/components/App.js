import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Players from './Players'
import Teams from './Teams'
import Navbar from './Navbar'

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
            <Route component={FourOfour} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
