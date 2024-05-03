import { createRouter, createWebHistory } from "vue-router";

import { DefaultLayout, ActionLayout, DashboardLayout } from "@/layouts";

import { defaultRoutes } from "@/router/default";
import { actionRoutes } from "@/router/actions";
import { route } from "@/router/route";
import { dashboardRoutes } from "./dashboard";

import { useAuthStore } from "@/store/auth";

const getAuth = () => useAuthStore();

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
      })),
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardLayout,
    beforeEnter: requireAdmin,
    children: [
      ...dashboardRoutes.map((item) => ({
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

function requireAdmin(to, from, next) {
  const auth = getAuth();
  const isAdmin = auth.user?.role.includes("ADMIN");

  if (auth.isLogin && isAdmin) {
    next();
  } else {
    next("/");
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
