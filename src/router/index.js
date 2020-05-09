import Vue from "vue";
import VueRouter from "vue-router";
import { AuthorizationRoutes } from "../views/authorizationPage/router.js";
import { ProfileRoutes } from "../views/profilePage/router.js";
import { RecordRoutes } from "../views/recordPage/router.js";
import firebase from "firebase/app";

Vue.use(VueRouter)

const routes = [
  ...AuthorizationRoutes,
  ...ProfileRoutes,
  ...RecordRoutes,
  {
    path: "/",
    name: "home",
    meta: { layout: "main", auth: true  },
    component: () => import("../views/homePage/Home.vue")
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/categoriesPage/Categories.vue")
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true },
    component: () => import("../views/historyPage/History.vue")
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true  },
    component: () => import("../views/planningPage/Planning.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(require => require.meta.auth)

  if (requireAuth && !currentUser) next('/login?message=login')
  next()
})

export default router
