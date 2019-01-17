
/**
 * Converts monthNum into String
 * 
 * @param {Number} num - month to convert for readability
 */
const stringifyMonth = num => {
  let stringMonth
  switch (num) {
  case 0:
    stringMonth = 'Jan'
    break
  case 1:
    stringMonth = 'Feb'
    break
  case 2:
    stringMonth = 'Mar'
    break
  case 3:
    stringMonth = 'Apr'
    break
  case 4:
    stringMonth = 'May'
    break
  case 5:
    stringMonth = 'June'
    break
  case 6:
    stringMonth = 'July'
    break
  case 7:
    stringMonth = 'Aug'
    break
  case 8:
    stringMonth = 'Sep'
    break
  case 9:
    stringMonth = 'Oct'
    break
  case 10:
    stringMonth = 'Nov'
    break
  default:
    stringMonth = 'Dec'
    break
  }
  return stringMonth
}

/**
 * Converts hoursNum into readable String
 * 
 * @param {Number} hours - hours to convert for readability
 */
const stringifyHours = hours => {
  // determine what half of day
  const suffix = hours >= 12 ? 'pm' : 'am'

  // shift hours
  const shifted = (hours + 11) % 12 + 1

  // combine shifted hours and suffix
  const stringHours = shifted + suffix
  return stringHours
}


/**
 * Converts chainObject into it's UI representation
 * 
 * @param {Object} chain - chain to be represented
 * @param {String} chain.dayStarted - day chain was started
 * @param {String} chain.dayBroken - day chain was broken
 * @param {String} chain.lastConcat - day chain was last added to 
 */
const representChain = chain => {
  // number of days passed since chain.dayStarted
  let chainLength = Math.floor((chain.lastConcat - chain.dayStarted) / 86400000)
  chainLength = 5

  // chainStart time data
  const start = new Date(chain.dayStarted)
  const startMonth = stringifyMonth(start.getMonth())
  const startDay = start.getDate()
  const startHours = stringifyHours(start.getHours())
  // chainEnd time data
  const end = new Date(chain.lastConcat)
  const endMonth = stringifyMonth(end.getMonth())
  const endDay = end.getDate()
  const endHours = stringifyHours(end.getHours())

  // stores representation of chain
  let virtualChain = `${ startMonth } ${ startDay } ${ startHours } *`

  // for each day add a link to chain
  for (let i = 0; i < chainLength; i++)
    virtualChain += '———*'

  // add end date to chain
  virtualChain += `${ endMonth } ${ endDay } ${ endHours }`

  return virtualChain
}

export default representChain