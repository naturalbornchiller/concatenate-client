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
      .then(this.modifyChains)
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
      .then(this.modifyChains)
      .catch(console.error)
  )
  
  modifyChains = () => {
    this.concatAvailability()
  }


  concatAvailability = () => {
    // if the last chain is broken
    if (this.state.task.chains[this.state.task.chains.length - 1].dateBroken) {
      // concat is not available
      this.setState({ concatAvailable: null })
    // otherwise
    } else {
      // concat is available if it's been at least 24 hrs since the last concat
      this.setState({ concatAvailable: new Date() - new Date(this.state.task.chains[this.state.task.chains.length - 1].lastConcat) > 86400000 })
    }
  }
  
  longestChain = () => {

    return Math.max.apply(null, this.chains.map(chain => chain.chainLength))
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
