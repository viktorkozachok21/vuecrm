import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { dateTimeFilter } from "@/filters/dateTime.filter";
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

Vue.filter("dateTimeFilter", dateTimeFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
