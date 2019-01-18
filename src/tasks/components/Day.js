import React from 'react'
import { parseDate, stringMonths } from '../helpers/taskHelpers'

const Day = props => {
  const { date, start, lastConc, dayBroken } = props.link
  const dateObj = new Date(date)
  let linkType = 'link-regular'
  let month = ''

  if (start) {
    linkType = 'link-start'
    month = stringMonths[dateObj.getMonth()]
  } else if (lastConc) {
    linkType = 'link-end'
    month = stringMonths[dateObj.getMonth()]

    // if day is broken, link is 'terminal'
    if (dayBroken) {
      linkType = 'link-terminal'
    }
  }

  return (
    <div className={ `link ${linkType}` }>
      <span>{ dateObj.getDate() } { month }</span><br/>
      {/* <span className="tooltiptext">${ parseDate(date) }</span> */}
    </div>
  )
}

export default Day