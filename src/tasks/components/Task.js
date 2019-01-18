import React, { Component } from 'react'
import { taskShow, taskDelete, taskPatch } from '../api'
import Chain from './Chain'
import '../Task.scss'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: {
        name: '',
        chains: []
      },
      taskVisible: true,
      concatAvailable: false
    }
  }

  componentDidMount () {
    this.taskShow()
  }

  componentDidUpdate (prevProps) {
    if (this.props.id !== prevProps.id) {
      this.taskShow()
    }
  }

  taskShow = () => (
    taskShow(this.props)
      .then(({ data }) => this.setState({ task: data.task }))
      .then(() => this.setState({ taskVisible: true }))
      .then(this.concatAvailability)
      .catch(console.error)
  )

  taskDelete = () => (
    taskDelete(this.props)
      .then(this.props.taskIndex)
      .then(() => this.setState({ taskVisible: false }))
      .catch(console.error)
  )

  taskPatch = () => (
    taskPatch(this.props)
      .then(this.taskShow)
      .then(this.concatAvailability)
      .catch(console.error)
  )

  concatAvailability = () => {
    this.setState({ concatAvailable: new Date() - new Date(this.state.task.chains[this.state.task.chains.length - 1].lastConcat) > 86400000 })
  }

  render () {
    return (
      <React.Fragment>
        <h2 className="task-header">
          { this.state.taskVisible && this.state.task.name }
        </h2>

        <div className="chain-container">
          { this.state.taskVisible && this.state.task.chains.map((data, i) => (
            <Chain key={ i } chainObj={ data } />
          ))}
        </div>

        { this.state.taskVisible && this.state.concatAvailable &&
        <input className="update-task"
          type="button"
          onClick={ this.taskPatch } 
          value="Concatenate!" /> }

        { this.state.taskVisible && <input className="delete-task"
          type="button"
          onClick={ this.taskDelete } 
          value="Stop Tracking Task" /> }
      </React.Fragment>
    )
  }
}
