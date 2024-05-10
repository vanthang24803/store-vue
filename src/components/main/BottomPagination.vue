<script setup>
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
} from "@/components/ui/pagination";

defineProps({
  currentPage: Number,
  total: Number,
  changePage: Function(),
});
</script>

<template>
  <Pagination v-slot="{ page }" :total="total" :default-page="currentPage">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            @click="changePage(item.value)"
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>
    </PaginationList>
  </Pagination>
</template>
