import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { dateTimeFilter } from "@/filters/dateTime.filter";
import messagePlugin from "@/utils/message.plugin";
import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter("dateTimeFilter", dateTimeFilter)

const firebaseConfig = {
  apiKey: "AIzaSyB44lTZUzlg7ySiNyhMSvNI446tgCGqXm8",
  authDomain: "vue-crm-2020-6b612.firebaseapp.com",
  databaseURL: "https://vue-crm-2020-6b612.firebaseio.com",
  projectId: "vue-crm-2020-6b612",
  storageBucket: "vue-crm-2020-6b612.appspot.com",
  messagingSenderId: "340745901557",
  appId: "1:340745901557:web:1bd3a6e2fd13d6c24bbcbc"
};

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app")
  }
})
