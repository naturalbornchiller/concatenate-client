import React, { Component } from 'react'
import { taskPost } from '../api'
import messages from '../messages'
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

  onCreateTask = ({ target }) => {
    const { setFlash } = this.props
    taskPost(this.props.user, { task: { name: this.state.name } })
      .then(this.props.taskIndex)
      .then(() => {
        target.style.backgroundColor = '#66CDAA'
        setTimeout(() => {
          target.style.backgroundColor = 'white'
        }, 250)
      })
      .then(() => setFlash(messages.postSuccess, 'success'))
      .catch(() => {
        // flash button color
        target.style.backgroundColor = 'lightcoral'
        setTimeout(() => {
          target.style.backgroundColor = 'white'
        }, 250)

        // display error message
        const msg = this.state.name ? messages.failure : messages.emptyInput
        setFlash(msg, 'error')
      })
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
