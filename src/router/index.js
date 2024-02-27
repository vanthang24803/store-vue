import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Manga from "@/views/Manga.vue";
import Detail from "@/views/Detail.vue";
import Products from "@/views/Products.vue";
import SachMoi from "@/views/SachMoi.vue";
import LightNovel from "@/views/LightNovel.vue";
import TieuThuyet from "@/views/TieuThuyet.vue";
import KyNang from "@/views/KyNang.vue";
import PhuKien from "@/views/PhuKien.vue";
import Order from "@/views/Order.vue";
import TraCuu from "@/views/TraCuu.vue";
import Cart from "@/views/Cart.vue";
import Checkout from "@/views/Checkout.vue";
import SearchPage from "@/views/SearchPage.vue";
import Login from "@/views/Login.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import ActionLayout from "@/layouts/ActionLayout.vue";

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
