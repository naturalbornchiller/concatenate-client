import React, { Component } from 'react'
import { taskShow } from '../api'
import representChain from '../helpers/taskHelpers'
import '../Task.scss'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chains: []
    }
  }

  taskShow = () => (
    taskShow(this.props)
      .then(res => {
        console.log(res.data.chains)
        return res
      })
      .then(({ data }) => this.setState({ chains: data.chains }))
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
        { this.props.id }
        <div>
          <p>
            { this.state.chains.map((chain, i) => (
              <span key={ i }>{ representChain(chain) }</span>
            ))}
          </p>
        </div>
      </React.Fragment>
    )
  }
}
