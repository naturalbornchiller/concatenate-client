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
    this.getAllTasks()
  }

  getAllTasks = () => {
    taskIndex(this.props.user)
      .then(({ data }) => this.setState({ tasks: [...data.tasks] }))
      .catch(console.error)
  }

  render() {
    return (
      <React.Fragment>
        <div className="task-nav">
          <h2>Tasks</h2>
          <TaskPost user={ this.props.user }  getAllTasks={ this.getAllTasks } />
          <ul className="task-link-container">
            { this.state.tasks.map((task, i) => (
              <Link key={ i } to={`/tasks/${task._id}`}>
                <li id={task._id} className="task-link">{task.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <Route path='/tasks/:id' component={Task} />
        </div>
      </React.Fragment>
    )
  }
}
