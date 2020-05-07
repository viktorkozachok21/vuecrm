export const RecordRoutes = [
  {
    path: "/record",
    component: () => import("./RecordModule.vue"),
    children: [
      {
        path: "/",
        name: "record",
        meta: { layout: "main" },
        component: () => import("./pages/Record.vue")
      },
      {
        path: "/detail",
        name: "detail",
        meta: { layout: "main" },
        component: () => import("./pages/Detail.vue")
      },
    ]
  },
]
