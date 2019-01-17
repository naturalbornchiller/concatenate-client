import React, { Component } from 'react'
import { createChainArray } from '../helpers/taskHelpers'

export default class Chain extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      chainArr: this.props.data
    }
  }

  sameDay = (d1, d2) => (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )

  componentDidMount() {
    this.setState({ chainArr: createChainArray(this.props.chainObj) })
  }

  render () {
    console.log(this.props)
    
    return (
      <p>{ this.props.chainObj.dayStarted }</p>
    )
  }
  
}