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

  render () {
    return (
      <React.Fragment>
        <h2 className="task-header">
          { this.state.taskVisible && this.state.task.name }
        </h2>

        <div className="chain-container">
          <h3>
            { this.state.taskVisible &&
              (this.state.task.createChainAvailable &&
                <input className="create-chain"
                  type="button"
                  onClick={ this.taskPatch } 
                  value="Create Chain!" />) ||
               (this.state.task.concatAvailable && 
                <input className="create-chain"
                  type="button"
                  onClick={ this.taskPatch } 
                  value="Concatenate!" />) }
          </h3>
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
