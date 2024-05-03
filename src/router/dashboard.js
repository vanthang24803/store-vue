import { Overview , Products } from "@/views/dashboard";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard Overview",
    component: Overview,
  },
  {
    path: "/dashboard/products",
    name: "Dashboard Products",
    component: Products,
  },
];


