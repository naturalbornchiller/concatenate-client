import React, { Component } from 'react'
import { taskPost } from '../api'
import '../Task.scss'

export default class TaskPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onCreateTask = () => {
    taskPost(this.props.user, { task: { name: this.state.name } })
      .then(this.props.taskIndex)
      .catch(() => console.error('error on newTask'))
      .finally(() => this.setState({ name: '' }))
  }

  render() {
    return (
      <div className="create-task-container">
        <input
          type="text"
          className="task-name-input"
          placeholder="Add a task!"
          onChange={ this.onChangeInput }
          value={ this.state.name }
          name="name"
          required />
        <input
          className="task-name-submit"
          type="button"
          onClick={ this.onCreateTask }
          value="+" />
      </div>
    )
  }
}
