import React, { Component } from 'react'

export default class Loading extends Component {
  state = {
    text: 'Loading'
  }

  componentDidMount() {
    const stopper = this.state.text + '...'

    this.interval = setInterval(() => {
      this.state.text === stopper
        ? this.setState({text: 'Loading'})
        : this.setState(({ text }) => ({text: text + '.'}))
    }, 300)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <div className='container'>
        <p className='text-center'>
          {this.state.text}
        </p>
      </div>
    )
  }
}
