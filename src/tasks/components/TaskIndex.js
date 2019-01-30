import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Task from './Task'
import TaskPost from './TaskPost'
import { Link, Route, withRouter } from 'react-router-dom'
import { taskIndex } from '../api'
import '../Task.scss'

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

  render() {
    return (
      <React.Fragment>
        <div>
          <h2 className="task-banner">Tasks</h2>
          <TaskPost user={ this.props.user }  taskIndex={ this.taskIndex } />
          <Tabs>
            { this.state.tasks.map((task, i) => (
              <Tab key={ i } eventKey={ task.name } title={ task.name } >
                <Task user={ this.props.user }
                  id={ task._id }
                  data={ task }
                  taskIndex={ this.taskIndex } />
              </Tab>
            ))}
          </Tabs>
        </div>
      </React.Fragment>
    )
  }
}
