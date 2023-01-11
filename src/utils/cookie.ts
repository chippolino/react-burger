const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : ''
}

const setCookie = (
  name: string,
  value: string,
  props: { [key: string]: string | number | Date | boolean } = {}
) => {
  props = {
    path: '/',
    ...props
  }

  let exp = props.expires
  if (typeof exp === 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString()
  }
  value = encodeURIComponent(value)
  let updateCookie = name + '=' + value
  for (const propName in props) {
    updateCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updateCookie += '=' + propValue
    }
  }
  document.cookie = updateCookie
}

const deleteCookie = (name: string) => {
  setCookie(name, '', { expires: -1 })
}

export { getCookie, setCookie, deleteCookie }
