import React, { Component } from 'react'
import { taskShow, taskDelete } from '../api'
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
      .catch(console.error)
  )

  taskDelete = () => (
    taskDelete(this.props)
      .then(this.props.taskIndex)
      .then(() => this.setState({ taskVisible: false }))
      .catch(console.error)
  )

  render () {
    return (
      <React.Fragment>
        <h2 className="task-header">{ this.state.taskVisible && this.state.task.name }</h2>
        <div className="chain-container">
          { this.state.taskVisible && this.state.task.chains.map((data, i) => (
            <Chain key={ i } chainObj={ data } />
          ))}
        </div>
        { this.state.taskVisible && <input className="delete-task"
          type="button"
          onClick={ this.taskDelete } 
          value="Stop Tracking Task" /> }
      </React.Fragment>
    )
  }
}
