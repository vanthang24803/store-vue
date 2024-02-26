<script setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { formatPrice, price } from '@/lib/format';
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShoppingCart } from 'lucide-vue-next';
import { useCartStore } from '@/store/cart';

const cart = useCartStore();
const props = defineProps({
    ship: Boolean,
    priceCod: Number,
    totalPrice: Number,
})


</script>

<template>
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger>
                <div class="w-full flex items-center justify-between px-2">
                    <div class="flex items-center space-x-3">
                        <ShoppingCart />
                        <span class="md:block hidden">
                            Hiển thị thông tin đơn hàng
                        </span>
                        <span v-if="ship == true">{{ price(priceCod) }}₫</span>
                        <span v-else>{{ price(totalPrice) }}₫</span>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <ScrollArea class="flex flex-col max-h-[50vh] space-y-4 py-4">
                    <div v-for="(item, index) in cart.items" :key="index">
                        <RouterLink :to="`/product/${item.product.id}`" target="_blank"
                            class="flex items-center space-x-4 mb-4">
                            <img :src="item.product.thumbnail" :alt="item.product.name"
                                class="w-[15%] md:w-[12%] relative" />

                            <div class="flex justify-between w-full">
                                <div class="flex flex-col text-xs"  >
                                    <span>{{ item.product.name }}</span>
                                    <span class="text-xs text-neutral-500">
                                        {{ item.product.options[0].name }}
                                    </span>
                                    <span class=" text-neutral-700">x{{ item.quantity }}</span>
                                </div>

                                <p class="text-[10px] text-muted-foreground">
                                    {{ formatPrice(
                                        item.product.options[0].price,
                                        item.product.options[0].sale
                                    ) }}₫
                                </p>
                            </div>
                        </RouterLink>
                    </div>
                </ScrollArea>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>