import React, { Component } from 'react'
import Task from './Task'
import '../Task.scss'
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
      <div className="task-nav">
        <h2>Tasks</h2>
        <form id="create-task">
          <input type="text" placeholder="Add a task!" required />
          <input type="submit" value="+" />
        </form>
        <ul>
          { this.state.tasks && this.state.tasks.map((task, i) => {
            return <Task key={i} id={task._id} name={task.name} chains={task.chains} />
          }) }
        </ul>
      </div>
    )
  }
}
