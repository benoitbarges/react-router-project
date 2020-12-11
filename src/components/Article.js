import React, { Component } from 'react'
import { getArticle } from '../api'
import PropTypes from 'prop-types'

export default class Article extends Component {
  state = {
    article: null
  }

  componentDidMount() {
    this.fetchArticle(this.props.teamId, this.props.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
     this.fetchArticle(this.props.teamId, this.props.id)
    }
  }

  fetchArticle = (teamId, id) => {
    this.setState({ article: null })

    getArticle(teamId, id)
      .then(article => this.setState({ article }))
  }

  render() {
    return this.props.children(this.state.article)
  }
}

Article.propTypes = {
  id: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
}
