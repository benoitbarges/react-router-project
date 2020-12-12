import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './Navbar'
import Loading from './Loading'

const Home = React.lazy(() => import('./Home'))
const Teams = React.lazy(() => import('./Teams'))
const TeamPage = React.lazy(() => import('./TeamPage'))
const Articles = React.lazy(() => import('./Articles'))
const Players = React.lazy(() => import('./Players'))

function FourOfour() {
  return <h1 className='text-center'>404 Not Found</h1>
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' render={() => <Home />} />
              <Route path='/players' render={() => <Players />} />
              <Route path='/teams' render={() => <Teams />} />
              <Route path='/:teamId/articles' render={() => <Articles />} />
              <Route exact path='/:teamId' render={() => <TeamPage />} />
              <Route component={FourOfour} />
            </Switch>
          </React.Suspense>
        </div>
      </Router>
    )
  }
}

export default App
