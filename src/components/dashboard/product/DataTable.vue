<script setup>
import { columns } from "./columns";
import {
  useVueTable,
  getCoreRowModel,
  FlexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Create from "../Create.vue";
import { ref } from "vue";
import { Input } from "@/components/ui/input";

const props = defineProps({
  data: Array,
});

const filter = ref("");
const sorting = ref([]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get globalFilter() {
      return filter.value;
    },

    get sorting() {
      return sorting.value;
    },
  },
  onSortingChange: (update) => {
    sorting.value =
      typeof update === "function" ? update(sorting.value) : update;
  },
});
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="w-[300px]">
      <label class="sr-only">Search</label>
      <div class="relative w-full">
        <Input placeholder="Search" v-model="filter" />
      </div>
    </div>
    <Create method="product" />
  </div>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
            {{ { asc: "↑", desc: "↓" }[header.column.getIsSorted()] }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colSpan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>

  <div class="flex items-center justify-end space-x-2 py-4">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getState().pagination.pageIndex + 1 }} of
      {{ table.getPageCount() }} page (s) - {{ table.getRowCount() }} product
      (s) .
    </div>
    <div class="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>
