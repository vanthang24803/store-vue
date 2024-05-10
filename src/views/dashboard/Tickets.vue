<script setup>
import { fetchVouchers } from "@/api/voucher";
import DataTable from "@/components/dashboard/voucher/DataTable.vue";
import Spinner from "@/components/main/Spinner.vue";
import { useQuery } from "@tanstack/vue-query";

const { data: vouchers } = useQuery({
  queryKey: ["orders"],
  queryFn: () => fetchVouchers(),
});
</script>

<template>
  <div class="h-full flex flex-col gap-4 px-4">
    <template v-if="vouchers">
      <DataTable :data="vouchers" method="vouchers" />
    </template>
    <template v-else>
      <Spinner />
    </template>
  </div>
</template>
