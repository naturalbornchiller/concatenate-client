import React, { Component } from 'react'
import { taskShow, taskDelete, taskPatch } from '../api'
import { Calendar, CalendarControls } from 'react-yearly-calendar'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
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
      },
      customClasses: {
        'range-left': [],
        'range': [],
        'range-right': []
      }
    }
  }

  /* Component Event Handlers */
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

  /* API */
  taskShow = () => (
    taskShow(this.props)
      .then(({ data }) => this.setState({ task: data.task }))
      .then(() => this.setState({ year: moment().year() }))
      .then(this.convertChainToRangeOfDays)
      .then(this.scrollToCalendar)
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

  /* Helpers */
  convertChainToRangeOfDays = () => {
    // store dates for which css will be applied
    const rangeStart = [], rangeEnd = [], range = []

    // push significant dates to arrays
    this.state.task.chains.forEach(({ dateStarted, dateBroken, lastConcat }) => {
      // store last day in chain
      const lastDay = dateBroken || lastConcat

      // create enumerable range from start to end date
      const rng = moment.range(moment(dateStarted), moment(lastDay))

      // add each date to the rangeClass array
      for (const day of rng.by('day')) {
        range.push(day.format('YYYY-MM-DD'))
      }

      // add first and last days to respective arrays
      rangeEnd.push(moment(lastDay).format('YYYY-MM-DD'))
      rangeStart.push(moment(dateStarted).format('YYYY-MM-DD'))
    })

    // format class object
    const classes = {
      range,
      'range-left': rangeStart, 
      'range-right': rangeEnd
    }

    // set state with custom Calendar classes
    this.setState({ customClasses: classes })
  }

  /* Update UI */
  onPrevYear = () => {
    this.setState(prevState => ({
      year: prevState.year - 1
    }))
  }

  onNextYear = () => {
    this.setState(prevState => ({
      year: prevState.year + 1
    }))
  }

  scrollToCalendar = () => this.cal.scrollIntoView({ behavior: 'smooth' })
  
  /* Content */
  render() {
    const {
      customClasses,
      year
    } = this.state

    return (
      <div id="calendar">
        <CalendarControls
          onPrevYear={() => this.onPrevYear()}
          onNextYear={() => this.onNextYear()}
          year={year}
        />
        <Calendar
          year={year}
          showWeekSeparators={false}
          customClasses={customClasses}
        />
        <div ref={cal => { this.cal = cal }} />
      </div>
    )
  }
}

export default Task2