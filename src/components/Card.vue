<script setup>
import { RouterLink } from 'vue-router';
import { formatPrice, price } from "@/lib/format";
import { Button } from '@/components/ui/button'
import { defineProps } from 'vue'

const props = defineProps({
    product: Object,
});
</script>

  
<template>
    <RouterLink :to="`/product/${product.id}`">
        <div
            class="w-full pb-4 bg-white rounded-md hover:shadow-md hover:cursor-pointer flex flex-col overflow-hidden group lg:h-[70vh] md:h-[60vh]">
            <img :src="product.thumbnail" :alt="product.name"
                class="object-fill rounded-md hover:scale-105 transform transition-transform duration-500 p-2 ">

            <div class="flex flex-col space-y-2 p-2">
                <span class="text-neutral-500 font-medium text-sm">
                    {{ product.brand }}
                </span>
                <p class="font-medium text-sm line-clamp-2">{{ product.name }}</p>
                <span class="text-neutral-500 font-medium text-sm">
                    {{ product.options.length }} phiên bản
                </span>

                <div class="flex items-center justify-between py-2">
                    <div v-if="product.options[0].sale > 0" class="flex flex-col">
                        <span class="font-bold text-sm text-red-600">
                            {{ formatPrice(product.options[0].price, product.options[0].sale) }}₫
                        </span>
                        <span class="text-sm line-through">
                            {{ price(product.options[0].price) }}₫
                        </span>
                    </div>
                    <span v-else class="text-sm font-medium">
                        {{ price(product.options[0].price) }}₫
                    </span>

                    <div v-if="product.options[0].sale > 0">
                        <Button size="sm" variant="destructive">
                            -{{ product.options[0].sale }}%
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>
  
