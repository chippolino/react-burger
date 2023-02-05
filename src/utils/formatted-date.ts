function getRalativeTimeString(date: Date | number, lang = navigator.language) {
  const timeMs = typeof date === 'number' ? date : date.getTime()

  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity]

  const units: Intl.RelativeTimeFormatUnit[] = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']

  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds))

  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex])
}

const formatDateTime = ({ locale = [], date = Date.now(), ...options }: any = {}) =>
  new Intl.DateTimeFormat(locale, options).format(date)

export const formattedDate = (date: Date | string | undefined) => {
  if (date) {
    return (
      getRalativeTimeString(new Date(date), 'ru') +
      ', ' +
      formatDateTime({
        date: new Date(date),
        locale: 'ru',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    )
  }
}
