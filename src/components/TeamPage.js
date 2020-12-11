import React, { Component } from 'react'
import { getTeam } from '../api'
import { Link } from 'react-router-dom'
import { getTeamsArticles } from '../api'

import TeamLogo from './TeamLogo'
import Team from './Team'

export default class TeamPage extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    getTeamsArticles(this.props.match.params.teamId)
      .then(articles => this.setState({ articles }))
  }

  render() {
    console.log(this.props)
    return (
      <Team id={this.props.match.params.teamId}>
        {(team) => team === null
            ? <h1>Loading</h1>
            : <div className='panel'>
                <TeamLogo id={team.id} />
                <h1 className='medium-header'>{team.name}</h1>
                <h4 style={{margin: '5px'}}>
                  <Link
                    to={{
                      pathname:'/players',
                      search: `teamId=${team.id}`
                    }}
                  >
                    View Roster
                  </Link>
                </h4>
                <h4>Championships</h4>
                <ul className='championships'>
                  {team.championships.map(c => <li key={c}>{c}</li>)}
                </ul>
                <ul className='info-list row' style={{width: '100%'}}>
                  <li>Established<div>{team.established}</div></li>
                  <li>Manager<div>{team.manager}</div></li>
                  <li>Coach<div>{team.coach}</div></li>
                  <li>Record<div>{team.wins} - {team.losses}</div></li>
                </ul>
                <h2 className='header'>Articles</h2>
                <ul className='articles'>
                  {this.state.articles.map(({ title, id }) => (
                    <li key={id}>
                      <Link to={`${this.props.match.url}/articles/${id}`}>
                        <h4 className='article-title'>{title}</h4>
                        <div className='article-date'></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
        }
      </Team>
    )
  }
}
