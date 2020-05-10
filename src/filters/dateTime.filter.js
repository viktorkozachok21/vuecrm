import store from "../store"

export function dateTimeFilter(value, format = "date") {
  const options = {}

  if (format.includes("date"))  {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }

  if (format.includes("time"))  {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  const locale = store.getters.getActiveUserInfo.locale || "uk-UA"
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}
