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

  onCreateTask = event => {
    taskPost(this.props.user, { task: { name: this.state.name } })
      .then(console.log)
      .then(({ data }) => this.props.addNewTask(data))
      .then(() => console.log('created a task!!'))
      .catch(() => console.error('error on createTask!'))
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
