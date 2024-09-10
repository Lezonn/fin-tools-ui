const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function roundEpochToDay(date) {
  return date - (date % (3600 * 24))
}

export function getDayString(date) {
  return days[date.getDay()]
}
