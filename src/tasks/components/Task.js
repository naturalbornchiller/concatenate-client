import React, { Component } from 'react'
import { taskShow, taskDelete, taskPatch } from '../api'
import { Calendar, CalendarControls } from 'react-yearly-calendar'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import messages from '../messages'
const moment = extendMoment(Moment)
import '../Calendar.scss'
import '../Task.scss'

export default class Task extends Component {
  
  constructor(props) {
    super(props)
    const today = moment()

    this.state = {
      today,
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
        'active-range': [],
        'active-range-left': [], 
        'active-range-right': [],
        winter: () => null,
        spring: () => null,
        summer: () => null,
        autumn: () => null,
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
  taskShow = () => {
    const { setFlash } = this.props
    taskShow(this.props)
      .then(({ data }) => this.setState({ task: data.task }))
      .then(() => this.setState({ year: moment().year() }))
      .then(this.convertChainToRangeOfDays)
      .then(() => this.setState({ taskVisible: true }))
      .then(this.scrollToCalendar)
      .catch(() => setFlash(messages.failure, 'error'))
  }
  taskDelete = ({ target }) => {
    const { setFlash } = this.props
    taskDelete(this.props)
      .then(this.props.taskIndex)
      .then(() => this.setState({ taskVisible: false }))
      .then(() => setFlash(messages.deleteSuccess, 'success'))
      .catch(() => setFlash(messages.failure, 'error'))
  }
  taskPatch = ({ target }) => {
    const { setFlash } = this.props
    taskPatch(this.props)
      .then(this.taskShow)
      .then(() => {
        target.style.backgroundColor = '#66CDAA'
        setTimeout(() => {
          target.style.backgroundColor = 'white'
        }, 250)
      })
      .then(() => {
        // discern updateType
        const msg = this.state.task.concatAvailable
          ? messages.concatChainSuccess
          : messages.createChainSuccess
        
        // display successful request
        setFlash(msg, 'success')
      })
      .catch(() => {
        // flash button red
        target.style.backgroundColor = 'lightcoral'
        setTimeout(() => {
          target.style.backgroundColor = 'white'
        }, 250)

        // display error on request
        setFlash(messages.failure, 'error')
      })
  }

  /* Helpers */
  convertChainToRangeOfDays = () => {
    // store dates for which css will be applied
    const rangeStart = [], rangeEnd = [], range = [], activeRange = [],
      activeRangeStart = [], activeRangeEnd = []

    // push significant dates to arrays
    this.state.task.chains.forEach(({ dateStarted, dateBroken, lastConcat }, i) => {
      // store last day in chain
      const lastDay = dateBroken || lastConcat

      // create enumerable range from start to end date
      const rng = moment.range(moment(dateStarted), moment(lastDay))

      if (i === this.state.task.chains.length - 1 && !dateBroken) {
        // add each date to the activeRangeClass array
        for (const day of rng.by('day')) {
          activeRange.push(day.format('YYYY-MM-DD'))
        }

        // add first and last days to respective arrays
        activeRangeEnd.push(moment(lastDay).format('YYYY-MM-DD'))
        activeRangeStart.push(moment(dateStarted).format('YYYY-MM-DD'))
      } else {
        // add each date to the rangeClass array
        for (const day of rng.by('day')) {
          range.push(day.format('YYYY-MM-DD'))
        }

        // add first and last days to respective arrays
        rangeEnd.push(moment(lastDay).format('YYYY-MM-DD'))
        rangeStart.push(moment(dateStarted).format('YYYY-MM-DD'))
      }
    })

    // format class object
    const classes = {
      winter: day => (moment(day).month() === 0 || moment(day).month() === 1 || moment(day).month() === 11) && range.every(date => !day.isSame(date, 'day')) && activeRange.every(date => !day.isSame(date, 'day')),
      spring: day => moment(day).month() === 2 || moment(day).month() === 3 || moment(day).month() === 4 && range.every(date => !day.isSame(date, 'day')) && activeRange.every(date => !day.isSame(date, 'day')),
      summer: day => moment(day).month() === 5 || moment(day).month() === 6 || moment(day).month() === 7 && range.every(date => !day.isSame(date, 'day')) && activeRange.every(date => !day.isSame(date, 'day')),
      autumn: day => moment(day).month() === 8 || moment(day).month() === 9 || moment(day).month() === 10 && range.every(date => !day.isSame(date, 'day')) && activeRange.every(date => !day.isSame(date, 'day')),
      range,
      'range-left': rangeStart, 
      'range-right': rangeEnd,
      'active-range': activeRange,
      'active-range-left': activeRangeStart, 
      'active-range-right': activeRangeEnd
    }

    const today = moment().format('YYYY-MM-DD')
    if (this.state.task.concatAvailable) {
      classes.concat = [today]
    } else if (this.state.task.createChainAvailable) {
      classes.create = [today]
    }

    // set state with custom Calendar classes
    this.setState({ customClasses: classes })
  }

  /* Update UI */
  // go back a year
  onPrevYear = () => {
    this.setState(prevState => ({
      year: prevState.year - 1
    }))
  }

  // go forward a year
  onNextYear = () => {
    this.setState(prevState => ({
      year: prevState.year + 1
    }))
  }

  // scroll down to calendar
  scrollToCalendar = () => {
    setTimeout(() => {
      this.cal.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }
  
  /* Content */
  render() {
    // determine update-type and class
    let patchType, inactive = ''
    if (this.state.task.concatAvailable) {
      patchType = 'Concat!'
    } else if (this.state.task.createChainAvailable) {
      patchType = 'Create Chain'
    } else {
      patchType = (this.state.task.hoursToBreak - 24) + 'h'
      inactive = 'inactive'
    }

    // destructure state
    const {
      customClasses,
      year,
      today
    } = this.state

    // return jsx
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
              selectedDay={today}
              customClasses={customClasses}
            />
            <div className="interface" ref={cal => { this.cal = cal }}>
              <i 
                className="material-icons delete-task"
                onClick={ this.taskDelete } >
                delete
              </i>
              <input className={'update-task ' + inactive}
                type="button"
                onClick={ this.taskPatch } 
                value={ patchType } />
            </div>
          </React.Fragment> }
      </div>
    )
  }
}