import React, { Component } from 'react'
import '../Task.scss'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
       
    }
    console.log(this.props)
  }

  render () {
    return (
      <React.Fragment>
        { this.props.task._id }
      </React.Fragment>
    )
  }
}
