import React, { Component } from 'react'
import { getTeamsArticles } from '../api'
import { Route } from 'react-router-dom'

import Sidebar from './Sidebar'
import Article from './Article'
import Loading from './Loading'

export default class Articles extends Component {
  state = {
    articles: [],
    loading: true
  }

  componentDidMount() {
    getTeamsArticles(this.props.match.params.teamId)
      .then(articles => this.setState({ articles, loading: false }))
  }

  render() {
    const { articles, loading } = this.state
    const { location, match } = this.props

    return (
      <div className='container two-column'>
        <Sidebar
          list={articles.map(article => article.title)}
          loading={loading}
          title='Articles'
          {...this.props}
        />

        <Route
          path={`${match.path}/:articleId`}
          render={({ match }) => (
            <div className='panel'>
              <Article id={match.params.articleId} teamId={match.params.teamId}>
                {(article) => article === null
                  ? <Loading />
                  : <div className='panel'>
                      <article className='article'>
                        <h1 className='header'>{article.title}</h1>
                        <p>{article.body}</p>
                      </article>
                    </div>}
              </Article>
            </div>
          )}
        />
      </div>
    )
  }
}
