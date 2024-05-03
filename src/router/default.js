import { Home, Detail } from "@/views/(main)";

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

import { Cart, SearchPage } from "@/views/(actions)";

import { Profile, ProfileOrder, Address } from "@/views/(auth)";


import { useAuthStore } from "@/store/auth";
import BlogDetail from "@/views/(blog)/BlogDetail.vue";
import Blog from "@/views/(blog)/Blog.vue";

const getAuth = () => useAuthStore();

export const defaultRoutes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "profile/:id",
    component: Profile,
    beforeEnter: requireAuth,
  },
  {
    path: "profile/:id/orders",
    component: ProfileOrder,
    beforeEnter: requireAuth,
  },
  {
    path: "profile/:id/address",
    component: Address,
    beforeEnter: requireAuth,
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
  {
    path: "/blogs/:slug",
    name: "detail-blog",
    component: BlogDetail,
  }
];

function requireAuth(to, from, next) {
  const auth = getAuth();
  if (!auth.isLogin) {
    next("/");
  } else {
    next();
  }
}
