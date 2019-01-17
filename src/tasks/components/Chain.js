import React, { Component } from 'react'
import { createChainArray } from '../helpers/taskHelpers'

export default class Chain extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      chainArr: []
    }
  }

  convertChainObjectToArray = () => {
    this.setState({ chainArr: createChainArray(this.props.chainObj) })
  }

  componentDidMount() {
    this.convertChainObjectToArray()
  }

  componentDidUpdate(prevProps) {
    if (this.props.chainObj._id !== prevProps.chainObj._id) {
      this.convertChainObjectToArray()
    }
  }

  render () {
    return (
      <React.Fragment>
        <p>{ this.state.chainArr.length }</p>
      </React.Fragment>
    )
  }
  
}