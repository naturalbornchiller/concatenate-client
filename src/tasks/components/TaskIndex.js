import React, { Component } from 'react'
import Task from './Task'
import TaskPost from './TaskPost'
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
      .then(({ data }) => this.setState({ tasks: [...data.tasks] }))
      .catch(console.error)
  }

  addNewTask = task => {
    this.setState(prevState => {
      return { tasks: prevState.tasks.unshift(task) }
    })
  }

  onTaskClick = () => console.log('Task was clicked!')

  render() {
    return (
      <div className="task-nav">
        <h2>Tasks</h2>
        <TaskPost user={ this.props.user } addNewTask={ this.addNewTask } />
        <ul>
          { this.state.tasks && this.state.tasks.map((task, i) => {
            return <Task
              key={ i } id={ task._id } name={ task.name }
              chains={ task.chains } onClick={ this.onTaskClick } />
          }) }
        </ul>
      </div>
    )
  }
}
