import { NotFound } from "@/views/(main)";
import { Checkout } from "@/views/(actions)";

export const route = [
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
