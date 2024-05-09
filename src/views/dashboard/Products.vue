<script setup>
import { fetchProducts } from '@/api/product';
import { useQuery } from '@tanstack/vue-query';
import DataTable from '@/components/dashboard/product/DataTable.vue';
import Create from '@/components/dashboard/Create.vue';

const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    keepPreviousData: true,
});

</script>

<template>
    <div class="h-full flex flex-col gap-4 px-4">
        <div class="flex items-center justify-end">
            <Create method="products" />
        </div>
        <template v-if="products">
            <DataTable :loading="isLoading" :data="products" />
        </template>
    </div>
</template>