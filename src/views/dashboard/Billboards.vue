<script setup>
import { fetchBillboard } from "@/api/billboard";
import DataTable from "@/components/dashboard/billboard/DataTable.vue";
import Spinner from "@/components/main/Spinner.vue";
import { useQuery } from "@tanstack/vue-query";

const { data: billboards } = useQuery({
  queryKey: ["products"],
  queryFn: () => fetchBillboard(),
  keepPreviousData: true,
});
</script>

<template>
  <div class="h-full flex flex-col gap-4 px-4">
    <template v-if="billboards">
      <DataTable :data="billboards" method="billboards" />
    </template>
    <template v-else>
      <Spinner />
    </template>
  </div>
</template>
