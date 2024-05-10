<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import Logo from "@/components/main/Logo.vue";

import {
  TrendingUp,
  ClipboardCheck,
  List,
  Store,
  ShoppingCart,
  Ticket,
} from "lucide-vue-next";

const route = useRoute();
const pathname = ref(route.fullPath);

const routes = [
  {
    name: "Overview",
    icon: TrendingUp,
    path: "overview",
  },
  {
    name: "Billboard",
    icon: ClipboardCheck,
    path: "billboards",
  },
  {
    name: "Category",
    icon: List,
    path: "categories",
  },
  {
    name: "Product",
    icon: Store,
    path: "products",
  },
  {
    name: "Order",
    icon: ShoppingCart,
    path: "orders",
  },
  {
    name: "Ticket",
    icon: Ticket,
    path: "tickets",
  },
];

watch(
  () => route.fullPath,
  (newValue) => {
    pathname.value = newValue;
  },
);
</script>

<template>
  <div
    class="h-full border-r flex flex-col overflow-y-auto shadow-sm light:bg-neutral-50/80"
  >
    <div class="p-6 h-20 flex items-center justify-center">
      <Logo />
    </div>
    <div class="p-2 rounded" v-for="route in routes" :key="route.name">
      <router-link
        :to="`/dashboard/${route.path}`"
        :class="`flex items-center px-6 py-3 text-sm font-medium  rounded-md light:hover:bg-neutral-100 dark:hover:bg-gray-900 ${pathname === `/dashboard/${route.path}` && 'bg-neutral-100 dark:bg-gray-900  text-blue-500 font-semibold'}`"
      >
        <component :is="route.icon" class="w-5 h-5 mr-2" />
        {{ route.name }}
      </router-link>
    </div>
  </div>
</template>
