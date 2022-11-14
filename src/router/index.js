import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/screen",
  },
  {
    path: "/screen",
    name: "Screen",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Screen/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/testPage/AboutView.vue"),
  },
  {
    path: "/test",
    name: "test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/testPage/Test.vue"),
  },
  {
    path: "/svgAnimation",
    name: "SvgAnimation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "svgAnimation" */ "../views/testPage/SvgAnimation.vue"
      ),
  },
  {
    path: "/screenLoading",
    name: "ScreenLoading",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "screenLoading" */ "../views/testPage/ScreenLoading.vue"
      ),
  },
  {
    path: "/flexBox",
    name: "FlexBox",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "flexBox" */ "../views/testPage/FlexBox.vue"),
  },
  {
    path: "/container",
    name: "Container",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "container" */ "../views/testPage/Container.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
