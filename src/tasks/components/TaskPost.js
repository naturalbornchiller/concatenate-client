import React, { Component } from 'react'
import { taskPost } from '../api'
import '../Task.scss'

export default class TaskPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null
    }
  }

  onChangeInput = event => (
    this.setState({ [event.target.name]: event.target.value })
  )

  onCreateTask = () => {
    taskPost(this.props.user, { task: { name: this.state.name } })
      .then(this.props.getAllTasks)
      .catch(() => console.error('error on newTask'))
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          className="task-name-input"
          placeholder="Add a task!"
          onChange={ this.onChangeInput }
          name="name"
          required />
        <input
          className="task-name-submit"
          type="button"
          onClick={ this.onCreateTask }
          value="+" />
      </React.Fragment>
    )
  }
}
