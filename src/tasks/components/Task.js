import React, { Component } from 'react'
import { taskShow } from '../api'
import Chain from './Chain'
import '../Task.scss'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: {
        name: '',
        chains: []
      }
    }
  }

  taskShow = () => (
    taskShow(this.props)
      .then(({ data }) => this.setState({ task: data.task }))
      .catch(console.error)
  )

  componentDidMount () {
    this.taskShow()
  }

  componentDidUpdate (prevProps) {
    if (this.props.id !== prevProps.id) {
      this.taskShow()
    }
  }

  render () {
    return (
      <React.Fragment>
        { this.state.task.name }
        <div>
          { this.state.task.chains.map((data, i) => (
            <Chain key={ i } chainObj={ data } />
          ))}
        </div>
      </React.Fragment>
    )
  }
}
