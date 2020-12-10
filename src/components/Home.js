import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getTeamNames } from '../api'

import TeamLogo from './TeamLogo'

export default class Home extends Component {
  state = {
    teamNames: []
  }

  componentDidMount() {
    getTeamNames()
      .then(teamNames => this.setState({ teamNames }))
  }

  render() {
    return (
      <div className='container'>
        <h1 className='large-header'>
          Hash History Basketball League
        </h1>

        <h3 className='header text-center'>
          Select a team
        </h3>
        <div className='home-grid'>
          {this.state.teamNames.map((name) => (
            <Link key={name} to={`/${name}`}>
              <TeamLogo id={name}/>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
