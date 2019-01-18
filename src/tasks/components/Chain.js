import React, { Component } from 'react'
import Day from './Day'
import { expandChainObj } from '../helpers/taskHelpers'

export default class Chain extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      chainArr: []
    }
  }

  componentDidMount() {
    this.expandChain()
  }

  componentDidUpdate(prevProps) {
    if (this.props.chainObj._id !== prevProps.chainObj._id) {
      this.expandChain()
    }
  }

  expandChain = () => {
    this.setState({ chainArr: expandChainObj(this.props.chainObj) })
  }

  countDown = () => {
    const { lastConcat } = this.props.chainObj
    return Math.ceil(48 - ((new Date() / 86400000) - (new Date(lastConcat) / 86400000)) * 24)
  }

  render () {
    return (
      <React.Fragment>
        <p>Chainlength: { this.state.chainArr.length }</p>
        <p>
          { !this.props.chainObj.dayBroken &&
          ('Hours until chain breaks: ' + this.countDown()) }
        </p>
        <div className="chain">
          { this.state.chainArr.map((link, i) => (
            <Day key={ i } link={ link } />
          ))}
        </div>
      </React.Fragment>
    )
  }
  
}