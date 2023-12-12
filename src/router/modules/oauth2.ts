export default {
  path: "/oauth2",
  redirect: "/oauth2/standard",
  meta: {
    icon: "informationLine",
    title: "OAuth2",
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/oauth2/standard",
      name: "Standard",
      component: () => import("@/views/oauth2/standard.vue"),
      meta: {
        title: "Standard"
      }
    },
    {
      path: "/oauth2/enhanced",
      name: "Enhanced",
      component: () => import("@/views/oauth2/enhanced.vue"),
      meta: {
        title: "Enhanced"
      }
    }
  ]
} as RouteConfigsTable;
