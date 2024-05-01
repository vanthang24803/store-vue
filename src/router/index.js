import { createRouter, createWebHistory } from "vue-router";

import { Home, NotFound, Detail } from "@/views/(main)";

import {
  KyNang,
  LightNovel,
  Manga,
  PhuKien,
  SachMoi,
  TieuThuyet,
  Products,
  BanChay,
} from "@/views/(collections)";

import { Cart, Checkout, Order, SearchPage, TraCuu } from "@/views/(actions)";

import {
  Login,
  Profile,
  ProfileOrder,
  Address,
  Register,
  Verify,
} from "@/views/(auth)";

import { Blog } from "@/views/(blog)";

import { DefaultLayout, ActionLayout } from "@/layouts";

import { useAuthStore } from "@/store/auth";

const getAuth = () => useAuthStore();

const routes = [
  {
    path: "/",
    name: "default",
    component: DefaultLayout,
    redirect: "/",
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
        meta: {
          title: "AMAK Store",
        },
      },
      {
        path: "profile/:id",
        component: Profile,
        beforeEnter: (to, from, next) => {
          const auth = getAuth();
          if (!auth.isLogin) {
            next("/");
          } else {
            next();
          }
        },
      },
      {
        path: "profile/:id/orders",
        component: ProfileOrder,
        beforeEnter: (to, from, next) => {
          const auth = getAuth();
          if (!auth.isLogin) {
            next("/");
          } else {
            next();
          }
        },
      },
      {
        path: "profile/:id/address",
        component: Address,
        beforeEnter: (to, from, next) => {
          const auth = getAuth();
          if (!auth.isLogin) {
            next("/");
          } else {
            next();
          }
        },
      },
      {
        path: "/search",
        component: SearchPage,
      },
      {
        path: "/collections/all",
        name: "all",
        component: Products,
      },
      {
        path: "/collections/manga-comic",
        name: "manga",
        component: Manga,
      },
      {
        path: "/collections/light-novel",
        name: "light-novel",
        component: LightNovel,
      },
      {
        path: "/collections/sach-ban-chay",
        name: "sach-ban-chay",
        component: BanChay,
      },
      {
        path: "/collections/tieu-thuyet",
        name: "tieu-thuyet",
        component: TieuThuyet,
      },
      {
        path: "/collections/sach-moi",
        name: "sach-moi",
        component: SachMoi,
      },
      {
        path: "/collections/ky-nang",
        name: "ky-nang",
        component: KyNang,
      },
      {
        path: "/collections/phu-kien",
        name: "phu-kien",
        component: PhuKien,
      },
      {
        path: "/cart",
        component: Cart,
      },
      {
        path: "/product/:id",
        name: "detail",
        component: Detail,
      },
      {
        path: "/blogs",
        name: "blogs",
        component: Blog,
      },
    ],
  },
  {
    path: "/",
    component: ActionLayout,
    children: [
      {
        path: "/checkout/:id",
        component: Order,
      },
      {
        path: "/tra-cuu",
        component: TraCuu,
      },
      {
        path: "login",
        component: Login,
        beforeEnter: (to, from, next) => {
          const auth = getAuth();
          if (!auth.isLogin) {
            next();
          } else {
            next("/");
          }
        },
      },
      {
        path: "register",
        component: Register,
        beforeEnter: (_, __, next) => {
          const auth = getAuth();
          if (!auth.isLogin) {
            next();
          } else {
            next("/");
          }
        },
      },
      {
        path: "verify-account",
        component: Verify,
      },
    ],
  },
  {
    path: "/check-out",
    component: Checkout,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
