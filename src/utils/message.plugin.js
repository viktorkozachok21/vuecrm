import { localizeFilter } from '@/filters/localize.filter'

export default {
  install(Vue, options) {
    Vue.prototype.$message = html => M.toast({html})

    Vue.prototype.$error = html => M.toast({html: `[${localizeFilter('Error')}]: ${html}`})
  }
}
