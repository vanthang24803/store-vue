<script setup>
import { columns } from './columns'
import { useVueTable, getCoreRowModel, FlexRender, getPaginationRowModel } from '@tanstack/vue-table';
import { Button } from '@/components/ui/button'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Spinner from '@/components/main/Spinner.vue';

const props = defineProps({
    data: Array,
    loading: Boolean
})


const table = useVueTable({
    get data() { return props.data },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
})

</script>

<template>
    <div class="border rounded-md">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="loading">
                    <Spinner />
                </template>
                <template v-else>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
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
                </template>
            </TableBody>
        </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
            {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }} page (s) - {{ table.getRowCount() }} product (s) .
        </div>
        <div class="flex items-center space-x-2">
            <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
                Previous
            </Button>
            <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                Next
            </Button>
        </div>
    </div>
</template>