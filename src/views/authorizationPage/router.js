export const AuthorizationRoutes = [
  {
    path: "/login",
    component: () => import("./AuthorizationModule.vue"),
    children: [
      {
        path: "/",
        name: "login",
        meta: { layout: "empty" },
        component: () => import("./pages/Login.vue")
      },
      {
        path: "/register",
        name: "register",
        meta: { layout: "empty" },
        component: () => import("./pages/Register.vue")
      }
    ]
  },
]
