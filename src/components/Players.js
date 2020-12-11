import React, { Component } from 'react'
import { getPlayers } from '../api'
import { parse } from 'query-string'
import { Route, Link } from 'react-router-dom'
import slug from 'slug'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Sidebar from './Sidebar'

export default class Players extends Component {
  state = {
    players: [],
    loading: true
  }

  componentDidMount() {
    const { location } = this.props

    location
      ? this.fetchPlayers(parse(location.search).teamId)
      : this.fetchPlayers()
  }

  fetchPlayers = (teamId) => {
    getPlayers(teamId)
      .then(players => this.setState({ players, loading: false }))
  }

  render() {

    const { players, loading } = this.state
    const { match, location } = this.props

    return (
      <div className='container two-column'>
        <Sidebar
         list={players.map(player => player.name)}
         loading={loading}
         title='Players'
         {...this.props}/>

         {!loading && location.pathname === "/players"
            ? <div className='sidebar-instruction'>Select a player</div>
            : null}

        <Route
          path={`${match.url}/:playerId`}
          render={({ match }) => {
            if(loading) return null

            const player = players.find(player => slug(player.name) === match.params.playerId)

            return (
              <TransitionGroup className='panel'>
                <CSSTransition key={location.key} timeout={300} classNames='fade' >
                  <div className='panel'>
                    <img className='avatar' src={player.avatar} alt={`picture of ${player.name}`} />
                    <h1 className='medium-header'>{player.name}</h1>
                    <h3 className='header'>#{player.number}</h3>
                    <div className='row'>
                      <ul className='info-list' style={{marginRight: 80}}>
                        <li>Team
                          <div>
                            <Link to={`/${player.teamId}`} style={{color: '#68809a'}}>
                              {player.teamId[0].toUpperCase() + player.teamId.slice(1)}
                            </Link>
                          </div>
                        </li>
                        <li>Position<div>{player.position}</div></li>
                        <li>PPG<div>{player.ppg}</div></li>
                      </ul>
                      <ul className='info-list' style={{marginRight: 80}}>
                        <li>APG<div>{player.apg}</div></li>
                        <li>SPG<div>{player.spg}</div></li>
                        <li>RPG<div>{player.rpg}</div></li>
                      </ul>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )
          }}
        />
      </div>
    )
  }
}
