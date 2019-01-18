import React from 'react'
import { parseDate, stringMonths } from '../helpers/taskHelpers'

const Day = ({ date, start, lastConc, dayBroken }) => {
  const dateObj = new Date(date)
  let linkType = 'regular-link'
  let month = ''

  if (start) {
    linkType = 'start-link'
    month = stringMonths[dateObj.getMonth()]
  } else if (lastConc) {
    linkType = 'end-link'
    month = stringMonths[dateObj.getMonth()]

    // if day is broken, link is 'terminal'
    if (dayBroken) {
      linkType = 'terminal-link'
    }
  }

  return (
    <div className={ `tooltip ${linkType}` }>
      <span>{ month } { dateObj.getDate() }</span>
      <span className="tooltiptext">${ parseDate(date) }</span>
    </div>
  )
}

export default Day