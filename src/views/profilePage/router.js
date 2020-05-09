export const ProfileRoutes = [
  {
    path: "/profile",
    component: () => import("./ProfileModule.vue"),
    children: [
      {
        path: "/",
        name: "profile",
        meta: { layout: "main", auth: true },
        component: () => import("./pages/Profile.vue")
      }
    ]
  },
]
