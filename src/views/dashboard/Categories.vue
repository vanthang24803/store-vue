<script setup lang="ts">
import { fetchCategories } from "@/api/category";
import DataTable from "@/components/dashboard/category/DataTable.vue";
import Spinner from "@/components/main/Spinner.vue";
import { useQuery } from "@tanstack/vue-query";

const { data: categories } = useQuery({
  queryKey: ["categories"],
  queryFn: () => fetchCategories(),
});
</script>

<template>
  <div class="h-full flex flex-col gap-4 px-4">
    <template v-if="categories">
      <DataTable :data="categories" method="categories" />
    </template>
    <template v-else>
      <Spinner />
    </template>
  </div>
</template>
