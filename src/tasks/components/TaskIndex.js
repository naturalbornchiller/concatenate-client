import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { taskIndex } from '../api'

export default class TaskIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: null
    }
  }

  // called immediately after component is mounted
  componentDidMount () {
    taskIndex(this.props.user)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(res => this.setState({ tasks: [...res.tasks] }))
      .catch(console.error)
  }

  render() {
    return (
      <div>
        {/* shows state at top of div */}
        <pre>{ JSON.stringify(this.state, null, 2) }</pre>
        <p>HelloThere</p>
      </div>
    )
  }
}
