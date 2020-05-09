export const RecordRoutes = [
  {
    path: "/record",
    component: () => import("./RecordModule.vue"),
    children: [
      {
        path: "/",
        name: "record",
        meta: { layout: "main", auth: true },
        component: () => import("./pages/Record.vue")
      },
      {
        path: "/detail",
        name: "detail",
        meta: { layout: "main", auth: true },
        component: () => import("./pages/Detail.vue")
      },
    ]
  },
]
