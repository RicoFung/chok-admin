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
    path: "/oauth2callback-standard",
    name: "OAuth2CallbackStandard",
    component: () => import("@/views/oauth2/oauth2callback-standard.vue"),
    meta: {
      title: "回调中...",
      showLink: false,
      rank: 105
    }
  },
  {
    path: "/oauth2callback-enhanced",
    name: "OAuth2CallbackEnhanced",
    component: () => import("@/views/oauth2/oauth2callback-enhanced.vue"),
    meta: {
      title: "回调中...",
      showLink: false,
      rank: 106
    }
  }
] as Array<RouteConfigsTable>;
