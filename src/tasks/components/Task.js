import React, { Component } from 'react'
import { taskShow, taskDelete, taskPatch } from '../api'
import { Calendar, CalendarControls } from 'react-yearly-calendar'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
import '../Calendar.scss'
import '../Task.scss'

export default class Task extends Component {
  
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
        concat: [],
        create: [],
        'range-left': [],
        'range': [],
        'range-right': [],
        'full-range': [],
        winter: () => null,
        spring: () => null,
        summer: () => null,
        autumn: () => null
      },
      taskVisible: true
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
      .then(() => this.setState({ taskVisible: true }))
      .then(this.scrollToCalendar)
      .catch(console.error)
  )
  taskDelete = ({ target }) => (
    taskDelete(this.props)
      .then(this.props.taskIndex)
      .then(() => this.setState({ taskVisible: false }))
      .catch(err => {
        console.error(err)
        target.style.backgroundColor = 'lightcoral'
        setTimeout(() => {
          target.style.backgroundColor = 'white'
        }, 250)
      })
  )
  taskPatch = ({ target }) => (
    taskPatch(this.props)
      .then(this.taskShow)
      .then(() => {
        target.style.backgroundColor = '#66CDAA'
        setTimeout(() => {
          target.style.backgroundColor = 'white'
        }, 250)
      })
      .catch(err => {
        console.error(err)
        target.style.backgroundColor = 'lightcoral'
        setTimeout(() => {
          target.style.backgroundColor = 'white'
        }, 250)
      })
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
      concat: [],
      create: [],
      range,
      'range-left': rangeStart, 
      'range-right': rangeEnd,
      'full-range': rangeStart.concat(range, rangeEnd),
      winter: day => moment(day).month() === 0 || moment(day).month() === 1 || moment(day).month() === 11,
      spring: day => moment(day).month() === 2 || moment(day).month() === 3 || moment(day).month() === 4,
      summer: day => moment(day).month() === 5 || moment(day).month() === 6 || moment(day).month() === 7,
      autumn: day => moment(day).month() === 8 || moment(day).month() === 9 || moment(day).month() === 10
    }

    const today = moment().format('YYYY-MM-DD')
    if (this.state.task.concatAvailable) {
      classes.concat.push(today)
    } else if (this.state.task.createChainAvailable) {
      classes.create.push(today)
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

  scrollToCalendar = () => {
    setTimeout(() => {
      this.cal.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }
  
  /* Content */
  render() {
    let patchType
    if (this.state.task.concatAvailable) {
      patchType = 'Concat!'
    } else if (this.state.task.createChainAvailable) {
      patchType = 'Create Chain'
    }

    const {
      customClasses,
      year
    } = this.state

    return (
      <div id="calendar">
        { this.state.taskVisible &&
          <React.Fragment>
            <CalendarControls
              onPrevYear={() => this.onPrevYear()}
              onNextYear={() => this.onNextYear()}
              year={year}
            />
            <Calendar
              year={year}
              customClasses={customClasses}
            />
            <div ref={cal => { this.cal = cal }}>
              <div className="delete-task-container">
                <i 
                  className="material-icons delete-task"
                  onClick={ this.taskDelete } >
                  delete
                </i>
              </div>
              { ((this.state.task.createChainAvailable || this.state.task.concatAvailable) &&
              <div className="update-task-container">
                <input className="update-task"
                  type="button"
                  onClick={ this.taskPatch } 
                  value={ patchType } />
              </div> ||
              <p className="come-back-later">Come back after the { this.state.task.hoursToConcat }hrs have passed to concatenate.</p>) }
            </div>
          </React.Fragment> }
      </div>
    )
  }
}