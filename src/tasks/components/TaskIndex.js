import React, { Component } from 'react'
// import { Tabs, Tab } from 'react-bootstrap'
import { Tabs, Tab, Typography } from '@material-ui/core'
import Task from './Task'
import TaskPost from './TaskPost'
import { Link, Route, withRouter } from 'react-router-dom'
import { taskIndex } from '../api'
import '../Task.scss'


const tabStyle = {
  textDecoration: 'none',
  fontSize: '15px',
  borderTop: '1px solid rgba(0,0,0,.2)',
  borderBottom: '1px solid rgba(0,0,0,.2)'
}

class TaskIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      value: null
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

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h2 className="task-banner">Tasks</h2>
          <TaskPost user={ this.props.user }  taskIndex={ this.taskIndex } />
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            { this.state.tasks.map((task, i) => (
              <Tab
                key={ i }
                label={ task.name }
                component={ Link }
                to={ `/tasks/${task._id}` }
                style={ tabStyle } />
            ))}
          </Tabs>
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

export default TaskIndex