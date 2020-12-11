import React, { Component } from 'react'
import { getTeamNames } from '../api'
import { Route, Link } from 'react-router-dom'

import Sidebar from './Sidebar'
import TeamLogo from './TeamLogo'
import Team from './Team'

export default class Teams extends Component {
  state = {
    teams: [],
    loading: true
  }

  componentDidMount() {
    getTeamNames()
      .then(teams => this.setState({teams, loading: false}))
  }

  render() {
    const { teams, loading } = this.state
    const { location, match } = this.props

    return (
      <div className='container two-column'>
        <Sidebar list={teams} loading={loading} title='Teams' {...this.props} />

        {!loading && location.pathname === "/teams"
          ? <div className='sidebar-instruction'>Select a team</div>
          : null}

          <Route
            path={`${match.url}/:teamId`}
            render={({ match }) => (
              <div className='panel'>
                <Team id={match.params.teamId}>
                  {(team) => team === null
                    ? <h1>Loading</h1>
                    : <div style={{width: '100%'}}>
                        <TeamLogo id={team.id} className='center' />
                        <h1 className='medium-header'>{team.name}</h1>
                        <ul className='info-list row'>
                          <li>Established<div>{team.established}</div></li>
                          <li>Manager<div>{team.manager}</div></li>
                          <li>Coach<div>{team.coach}</div></li>
                        </ul>
                        <Link to={`/${team.id}`} className='center btn-main'>
                          {team.name} Team Page
                        </Link>
                      </div>}
                </Team>
              </div>
            )}
          />
      </div>
    )
  }
}
