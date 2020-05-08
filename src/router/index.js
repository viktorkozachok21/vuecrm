import Vue from "vue";
import VueRouter from "vue-router";
import { AuthorizationRoutes } from "../views/authorizationPage/router.js";
import { ProfileRoutes } from "../views/profilePage/router.js";
import { RecordRoutes } from "../views/recordPage/router.js";

Vue.use(VueRouter);

const routes = [
  ...AuthorizationRoutes,
  {
    path: "/",
    name: "home",
    meta: { layout: "main"  },
    component: () => import("../views/homePage/Home.vue")
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main" },
    component: () => import("../views/categoriesPage/Categories.vue")
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main" },
    component: () => import("../views/historyPage/History.vue")
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main"  },
    component: () => import("../views/planningPage/Planning.vue")
  },
  ...ProfileRoutes,
  ...RecordRoutes
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
