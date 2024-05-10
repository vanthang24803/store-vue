import {
  Overview,
  Products,
  Billboards,
  Categories,
  Orders,
  Tickets,
} from "@/views/dashboard";

export const dashboardRoutes = [
  {
    path: "overview",
    component: Overview,
  },
  {
    path: "products",
    component: Products,
  },
  {
    path: "billboards",
    component: Billboards,
  },
  {
    path: "categories",
    component: Categories,
  },
  {
    path: "orders",
    component: Orders,
  },
  {
    path: "tickets",
    component: Tickets,
  },
];
