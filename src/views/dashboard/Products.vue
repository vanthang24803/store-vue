<script setup>
import { fetchProducts } from '@/api/product';
import { useQuery } from '@tanstack/vue-query';
import DataTable from '@/components/dashboard/product/DataTable.vue';
import Spinner from '@/components/main/Spinner.vue';

const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    keepPreviousData: true,
});

</script>

<template>
    <div class="h-full flex flex-col gap-4 px-4">
        <template v-if="products">
            <DataTable :loading="isLoading" :data="products" />
        </template>
        <template v-else>
            <Spinner />
        </template>
    </div>
</template>