import React, { Component } from 'react'
import { taskShow, taskDelete, taskPatch } from '../api'
import { Calendar, CalendarControls } from 'react-yearly-calendar'
import moment from 'moment'
import '../Calendar.scss'
import '../Task.scss'

class Task2 extends Component {

  constructor(props) {
    super(props)
    const today = moment()
    this.state = {
      year: today.year(),
      task: {
        name: '',
        chains: []
      }
    }
  }

  componentDidMount () {
    // make request to the api for selected task
    this.taskShow()
  }

  componentDidUpdate (prevProps) {
    // hen a different link is clicked
    if (this.props.id !== prevProps.id) {
      this.taskShow() // make request for that task to the api
    }
  }

  taskShow = () => (
    taskShow(this.props)
      .then(({ data }) => this.setState({ task: data.task }))
      .catch(console.error)
  )

  taskDelete = () => (
    taskDelete(this.props)
      .then(this.props.taskIndex)
      .catch(console.error)
  )

  taskPatch = () => (
    taskPatch(this.props)
      .then(() => this.taskShow())
      .catch(console.error)
  )

  customClasses = day => (
    this.state.task.chains.forEach(chain => {
      if (day.isSame(chain.dayStarted, 'day')) return 'range-left'
      if (day.isSame(chain.dayBroken, 'day')) return 'range-right'
      if (day.isBetween(chain.dayStarted, chain.dayBroken || chain.lastConcat)) {
        return 'range'
      }
    })

  )

  render() {
    const {
      year
    } = this.state
    return (
      <div id="calendar">
        <CalendarControls
          year={year}
        />
        <Calendar
          year={year}
          showWeekSeparators={false}
          customClasses={this.customClasses}
        />
      </div>
    )
  }
}

export default Task2