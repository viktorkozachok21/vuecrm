import store from "../store"
import uk from "../locales/uk.json"
import en from "../locales/en.json"

const locales = {
  'uk-UA': uk,
  'en-US': en
}

export function localizeFilter(key) {
  const locale = store.getters.getActiveUserInfo.locale || "uk-UA"
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
