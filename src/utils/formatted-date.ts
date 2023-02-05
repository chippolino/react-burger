export const formattedDate = (date: string | undefined) => {
  if (typeof date === 'string') {
    const hours = () => {
      if (new Date(date).getHours() < 10) {
        return '0' + new Date(date).getHours()
      }
      if (new Date(date).getHours() >= 10) {
        return new Date(date).getHours()
      }
    }

    const minutes = () => {
      if (new Date(date).getMinutes() < 10) {
        return '0' + new Date(date).getMinutes()
      }
      if (new Date(date).getMinutes() >= 10) {
        return new Date(date).getMinutes()
      }
    }

    if (new Date().getDate() - new Date(date).getDate() === 0) {
      return 'Сегодня, ' + hours() + ':' + minutes()
    }

    if (new Date().getDate() - new Date(date).getDate() <= 1) {
      return 'Вчера, ' + hours() + ':' + minutes()
    }

    if (new Date().getDate() - new Date(date).getDate() > 1) {
      return new Date().getDate() - new Date(date).getDate() + ' дня назад, ' + hours() + ':' + minutes()
    }

    if (new Date().getDate() - new Date(date).getDate() > 4) {
      return new Date().getDate() - new Date(date).getDate() + ' дней назад, ' + hours() + ':' + minutes()
    }
  }
}
