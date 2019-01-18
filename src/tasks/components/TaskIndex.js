import React, { Component } from 'react'
import Task from './Task'
import TaskPost from './TaskPost'
import { Link, Route } from 'react-router-dom'
import '../Task.scss'
import { withRouter } from 'react-router-dom'
import { taskIndex } from '../api'

export default class TaskIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
  }

  // called immediately after component is mounted
  componentDidMount () {
    this.taskIndex()
  }

  taskIndex = () => {
    taskIndex(this.props.user)
      .then(({ data }) => this.setState({ tasks: [...data.tasks] }))
      .catch(console.error)
  }

  unmountSelectedTask = () => {
    
  }

  render() {
    // task={ this.findSelectedTask(match.params.id) }
    return (
      <React.Fragment>
        <div className="task-nav">
          <h2>Tasks</h2>
          <TaskPost user={ this.props.user }  getAllTasks={ this.getAllTasks } />
          <ul className="task-link-container">
            { this.state.tasks.map((task, i) => (
              <li key={ i } id={ task._id } >
                <Link to={`/tasks/${task._id}`} className="task-link" >
                  { task.name.length > 16
                    ? task.name.substr(0, 15).trim() + '...'
                    : task.name }
                </Link>  
              </li>
            ))}
          </ul>
        </div>
        <div className="selected-task-container">
          <Route path='/tasks/:id' render={ ({ match }) => (
            <Task user={ this.props.user }
              id={ match.params.id } 
              taskIndex={ this.taskIndex } />
          )} />
        </div>
      </React.Fragment>
    )
  }
}
