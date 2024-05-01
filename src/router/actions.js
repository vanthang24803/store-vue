import { Order, TraCuu } from "@/views/(actions)";
import { Login, Register, Verify } from "@/views/(auth)";

import { useAuthStore } from "@/store/auth";

const getAuth = () => useAuthStore();

export const actionRoutes = [
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
    beforeEnter: requireGuest,
  },
  {
    path: "register",
    component: Register,
    beforeEnter: requireGuest,
  },
  {
    path: "verify-account",
    component: Verify,
  },
];

function requireGuest(to, from, next) {
  const auth = getAuth();
  if (!auth.isLogin) {
    next();
  } else {
    next("/");
  }
}
