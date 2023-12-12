// 最简代码，也就是这些字段必须有
export default {
  path: "/test",
  meta: {
    title: "测试"
  },
  children: [
    {
      path: "/test/index",
      name: "Test",
      component: () => import("@/views/test/index.vue"),
      meta: {
        title: "普通测试",
        showParent: true
      }
    }
  ]
};
