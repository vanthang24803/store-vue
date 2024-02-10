import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import NewBook from "@/views/NewBook.vue";
import NotFound from "@/views/NotFound.vue";
import Manga from "@/views/Manga.vue";
import Detail from "@/views/Detail.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

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
      },
      {
        path: "/collections/all",
        name: "newBook",
        component: NewBook,
      },
      {
        path: "/collections/manga-comic",
        name: "manga",
        component: Manga,
      },
      {
        path: "/product/:id",
        name: "detail",
        component: Detail,
      },
    ],
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
