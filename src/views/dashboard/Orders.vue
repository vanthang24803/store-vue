<script setup>
import { fetchOrders } from "@/api/orders";
import DataTable from "@/components/dashboard/order/DataTable.vue";
import Spinner from "@/components/main/Spinner.vue";
import { useQuery } from "@tanstack/vue-query";

const { data: orders } = useQuery({
  queryKey: ["orders"],
  queryFn: () => fetchOrders(),
});
</script>

<template>
  <div class="h-full flex flex-col gap-4 px-4">
    <template v-if="orders">
      <DataTable :data="orders" method="orders" />
    </template>
    <template v-else>
      <Spinner />
    </template>
  </div>
</template>
