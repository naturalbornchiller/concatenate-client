import '../Task.scss'

/* Constants */
export const stringMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const stringDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

/* Functions */
/**
 * Converts hoursNum into readable String
 * 
 * @param {Number} hours - integer hours to convert for readability
 */
const stringifyHours = hours => {
  // determine what half of day
  const suffix = hours >= 12 ? 'PM' : 'AM'

  // shift hours
  const shifted = (hours + 11) % 12 + 1

  // combine shifted hours and suffix
  const stringHours = shifted + suffix
  return stringHours
}

/**
 * Parses a date string | object
 * 
 * @param {Number | Object} date - string or object date to parse
 * @param {Boolean} displayHours - if true, returned string holds hours
 */
export const parseDate = (date, displayHours = false) => {
  const dateObj = new Date(date) // converts date to an object
  let parsed = '' // stores parsed string

  // if displayHours is set to true
  if (displayHours) {
    // adds hours to beginning of string
    parsed += stringifyHours(dateObj.getHours())
  }
  
  // adds the rest of the date data
  parsed += `${stringDays[dateObj.getDay()]}, ${stringMonths[dateObj.getMonth()]} ${dateObj.getFullYear()}`
  
  return parsed
}

/**
 * Create array of chainlinks from chainObject
 * @param {Object} chainObj - chainObj to be expanded
 * @param {String} chain.dateStarted - day chain was started
 * @param {String} chain.dateBroken - day chain was broken
 * @param {String} chain.lastConcat - day chain was last added to 
 */
export const expandChainObj = chainObj => {
  const chainArr = [] // store chainlinks

  // convert to Date objects
  const startDay = new Date(chainObj.dateStarted)
  const endDate = new Date(chainObj.lastConcat)

  // number of days passed since chain started
  const chainLength = 32// Math.floor((lastConcat - dateStarted) / 86400000)
  
  for (let i = 0; i < chainLength; i++) {
    // get the day i-days since chain started
    const newDay = new Date()
    newDay.setDate(startDay.getDate() + i)
    const link = {
      start: i === 0,
      lastConc: false,
      dateBroken: false
    }

    // if it's the last link in the chain 
    if (i + 1 === chainLength) {
      // if chain is broken, store true
      if (chainObj.dateBroken) {
        link.dateBroken = true
      }

      // last day is the last concat
      link.lastConc = true
      // stores the date of the last day
      link.date = endDate
    } else {
      link.date = newDay
    }

    // concat link to chain
    chainArr.push(link)
  }

  return chainArr
}