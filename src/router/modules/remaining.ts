import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: $t("menus.hslogin"),
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: $t("status.hsLoad"),
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  },
  {
    path: "/authorized-standard",
    name: "AuthorizedStandard",
    component: () => import("@/views/oauth2/authorized-standard.vue"),
    meta: {
      title: "回调中...",
      showLink: false,
      rank: 105
    }
  },
  {
    path: "/authorized-enhanced",
    name: "AuthorizedEnhanced",
    component: () => import("@/views/oauth2/authorized-enhanced.vue"),
    meta: {
      title: "回调中...",
      showLink: false,
      rank: 106
    }
  }
] as Array<RouteConfigsTable>;
