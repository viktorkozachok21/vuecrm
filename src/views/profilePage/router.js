export const ProfileRoutes = [
  {
    path: "/profile",
    component: () => import("./ProfileModule.vue"),
    children: [
      {
        path: "/",
        name: "profile",
        meta: { layout: "main" },
        component: () => import("./pages/Profile.vue")
      }
    ]
  },
]
