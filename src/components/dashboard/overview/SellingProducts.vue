<script setup>
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { TrendingUp } from "lucide-vue-next";
import Spinner from "@/components/main/Spinner.vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchProductSelling } from "@/api/product";



const { isLoading: loading, data: products } = useQuery({
    queryKey: ['selling'],
    queryFn: () => fetchProductSelling(),
});


</script>

<template>
    <div class="p-2">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle class="text-xl font-semibold">
                    Products
                </CardTitle>
                <CardDescription>
                    <TrendingUp class="w-4 h-4" />
                </CardDescription>
            </CardHeader>
            <CardDescription class="pb-4 px-6">
                Top products selling
            </CardDescription>
            <CardContent>
                <Spinner v-if="loading" />
                <Table v-else>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead class="w-[100px]">Brand</TableHead>
                            <TableHead class="text-right w-[100px]">
                                Sold
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="product in products.slice(0,10)" :key="product.id">
                            <TableCell>
                                {{ product.name }}
                            </TableCell>
                            <TableCell >{{ product.brand }}</TableCell>
                            <TableCell class="text-right">{{ product.sold }}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
</template>
