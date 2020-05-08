import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { dateTimeFilter } from "@/filters/dateTime.filter";
import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.use(Vuelidate)
Vue.filter("dateTimeFilter", dateTimeFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
