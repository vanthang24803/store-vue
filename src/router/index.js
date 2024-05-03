import { createRouter, createWebHistory } from "vue-router";

import { DefaultLayout, ActionLayout } from "@/layouts";

import { defaultRoutes } from "@/router/default";
import { actionRoutes } from "@/router/actions";
import { route } from "@/router/route";

const routes = [
  {
    path: "/",
    name: "default",
    component: DefaultLayout,
    redirect: "/",
    children: [
      ...defaultRoutes.map((item) => ({
        path: item.path,
        name: item.name,
        component: item.component,
        beforeEnter: item.beforeEnter,
      })),
    ],
  },
  {
    path: "/",
    component: ActionLayout,
    children: [
      ...actionRoutes.map((item) => ({
        path: item.path,
        name: item.name,
        component: item.component,
        beforeEnter: item.beforeEnter,
      })),
    ],
  },
  ...route.map((item) => ({
    path: item.path,
    name: item.name,
    component: item.component,
    beforeEnter: item.beforeEnter,
  })),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
