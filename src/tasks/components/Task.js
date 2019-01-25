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
      taskVisible: true
    }
  }

  componentDidMount () {
    // make request to the api for selected task
    this.taskShow()
  }

  componentDidUpdate (prevProps) {
    // if the id of the prop changes (e.g., when a different link is clicked)
    if (this.props.id !== prevProps.id) {
      this.taskShow() // make request for that task to the api
    }
  }

  taskShow = () => (
    taskShow(this.props)
      .then(({ data }) => this.setState({ task: data.task }))
      .then(() => this.setState({ taskVisible: true }))
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
      .catch(console.error)
  )

  patchTitle = () => {
    if (this.state.task.createChainAvailable) {
      return 'Create chain!'
    } else if (this.state.task.concatAvailable) {
      return 'Concat!'
    } else {
      return false
    }
  }

  render () {
    return (
      <React.Fragment>
        { this.state.taskVisible &&
        (<div>
          <h2 className="task-header">
            { this.state.task.name }
          </h2>

          <div className="chain-container">
            { this.state.task.chains.map((data, i) => (
              <Chain key={ i } chainObj={ data } />
            ))}
          </div>
          { ((this.state.task.createChainAvailable || this.state.task.concatAvailable) &&
              <input className="update-task"
                type="button"
                onClick={ this.taskPatch } 
                value={'Create Chain!'} /> ||
            <p className="come-back-later">Come back after the { this.state.task.hoursToConcat }hrs have passed to concatenate.</p>) }
          { <input className="delete-task"
            type="button"
            onClick={ this.taskDelete } 
            value="Stop Tracking Task" /> }
        </div>)}
      </React.Fragment>
    )
  }
}
