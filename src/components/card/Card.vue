<script setup>
import { RouterLink } from 'vue-router';
import { formatPrice, price } from "@/lib/format";
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-vue-next';
import { useCartStore } from '@/store/cart';

defineProps({
    product: Object,
});


const cart = useCartStore();

</script>

  
<template>
    <div>
        <div class="w-full pb-4 bg-white rounded-md hover:shadow-md 
            hover:cursor-pointer flex flex-col overflow-hidden group
             lg:h-[72vh] h-[55vh] md:h-[65vh] relative">
            <img :src="product.thumbnail" :alt="product.name"
                class="object-cover rounded-md hover:scale-105 lg:h-[40vh] transform transition-transform duration-500 p-2 ">

            <div class="flex flex-col space-y-2 p-2 lg:p-4">
                <span class="text-neutral-500 font-medium text-sm">
                    {{ product.brand }}
                </span>
                <RouterLink :to="`/product/${product.id}`" class="font-medium text-sm line-clamp-2">{{ product.name }}
                </RouterLink>
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
                        <Button size="sm" variant="destructive" >
                            -{{ product.options[0].sale }}%
                        </Button>
                    </div>
                </div>
                <div class="my-2 lg:absolute lg:bottom-4 flex items-center space-x-4"  @click="cart.addItem(product, product.options[0].id, 1)"
                    v-if="product.options[0].quantity > 0">
                    <div class="w-9 h-9 flex items-center justify-center bg-[#65b10d] rounded-full animate-bounce"
                       >
                        <ShoppingCart class="w-5 h-5" />
                    </div>
                    <span class="font-semibold text-[12px] uppercase">
                        Thêm vào giỏ
                    </span>
                </div>

                <div class="my-2 flex absolute bottom-4 items-center space-x-4" v-else>
                    <div class="w-9 h-9 flex items-center justify-center bg-neutral-300/90 rounded-full cursor-not-allowed">
                        <ShoppingCart class="w-5 h-5" />
                    </div>
                    <span class="font-semibold text-[12px] uppercase text-neutral-400 cursor-not-allowed">
                        Hết hàng
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
  
