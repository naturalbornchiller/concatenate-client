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

  render () {
    return (
      <React.Fragment>
        <p>Chainlength: { this.state.chainArr.length }</p>
        <div className="chain">
          { this.state.chainArr.map((link, i) => (
            <Day key={ i } link={ link } />
          ))}
        </div>
      </React.Fragment>
    )
  }
  
}